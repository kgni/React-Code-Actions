import * as vscode from 'vscode';
import { ReactNativeConfig } from './configTypes/reactNativeConfig';
import { ReactWebConfig } from './configTypes/reactWebConfig';
import { GeneralConfig } from './configTypes/generalConfig';
import { BaseConfig } from './configTypes/baseConfig';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.languages.registerCodeActionsProvider(
			{ pattern: '**/*.{tsx,jsx}' },
			new ReactCodeActions(),
			{
				providedCodeActionKinds: ReactCodeActions.providedCodeActionKinds,
			}
		)
	);

	let wrapActionCommand = vscode.commands.registerCommand(
		'reactCodeActions.wrapElement',
		async (abbreviationElement) => {
			try {
				await vscode.commands.executeCommand('editor.emmet.action.balanceOut');
				// TODO: look at this delay, it's a bit hacky. We need to find a better solution.
				// add a minor delay here to ensure the balanceOut command is completed. Without it errors can occur where the elements will not only wrap but also appear in the middle of the document causing all kinds of syntax errors. This is a fix for now, would like to have a better solution.
				await new Promise((resolve) => setTimeout(resolve, 100));
				await vscode.commands.executeCommand(
					'editor.emmet.action.wrapWithAbbreviation',
					{ abbreviation: abbreviationElement }
				);
			} catch (error) {
				vscode.window.showErrorMessage('Something went wrong');
			}
		}
	);

	context.subscriptions.push(wrapActionCommand);
}

export class ReactCodeActions implements vscode.CodeActionProvider {
	public static readonly providedCodeActionKinds = [
		vscode.CodeActionKind.QuickFix,
	];

	private checkIfPathIsAllowed(
		config: vscode.WorkspaceConfiguration,
		specificConfig: 'reactNative' | 'reactWeb'
	): boolean {
		// get config from settings:

		const currentConfig: BaseConfig | undefined = config.get(specificConfig);

		let currentFilePath: string | undefined = undefined;

		if (vscode.window.activeTextEditor) {
			currentFilePath = vscode.window.activeTextEditor.document.uri.fsPath;
		}

		if (
			!currentConfig?.folderPaths ||
			currentConfig?.folderPaths.length === 0
		) {
			return true;
		}

		return currentConfig?.folderPaths.some((path) =>
			currentFilePath?.includes(path)
		);
	}

	public provideCodeActions(
		document: vscode.TextDocument,
		range: vscode.Range
	): vscode.CodeAction[] | undefined {
		// get config from settings:
		const config = vscode.workspace.getConfiguration('reactCodeActions');

		const reactNativeConfig: ReactNativeConfig | undefined =
			config.get('reactNative');
		const reactWebConfig: ReactWebConfig | undefined = config.get('reactWeb');
		const generalConfig: GeneralConfig | undefined = config.get('general');

		const codeActions: vscode.CodeAction[] = [];

		// TODO: we need to check if the cursor is inside a JSX element? or is selecting some text at least? Currently the actions will show no matter what if the document is a .tsx or .jsx file.
		if (
			reactNativeConfig &&
			reactNativeConfig.enableCodeActions &&
			this.checkIfPathIsAllowed(config, 'reactNative')
			// && isSelectedJSXElement
		) {
			reactNativeConfig.wrappingElements.forEach((element) => {
				const wrapWithElementFix = this.createWrap(
					document,
					range,
					element,
					generalConfig?.enableClassNameProp
				);
				codeActions.push(wrapWithElementFix);
			});
		}

		if (
			reactWebConfig &&
			reactWebConfig.enableCodeActions &&
			this.checkIfPathIsAllowed(config, 'reactWeb')
			// && isSelectedJSXElement
		) {
			reactWebConfig?.wrappingElements.forEach((element) => {
				const wrapWithElementFix = this.createWrap(
					document,
					range,
					element,
					generalConfig?.enableClassNameProp
				);
				codeActions.push(wrapWithElementFix);
			});
		}

		// Remove tag action add to beginning of array - this way it will be the first action in the list (to be refactored later to be more dynamic and configurable in settings)
		codeActions.unshift(
			this.createCodeAction(
				'Remove tag',
				vscode.CodeActionKind.QuickFix,
				'editor.emmet.action.removeTag',
				'Remove tag'
			)
		);

		return codeActions;
	}

	private createCodeAction(
		codeActionTitle: string,
		codeActionKind: vscode.CodeActionKind = vscode.CodeActionKind.QuickFix,
		command: string,
		commandTitle: string
	): vscode.CodeAction {
		const action = new vscode.CodeAction(codeActionTitle, codeActionKind);
		action.command = {
			command: command,
			title: commandTitle,
		};
		return action;
	}

	private createWrap(
		document: vscode.TextDocument,
		range: vscode.Range,
		element: string,
		isTailwindEnabled: boolean = false
	): vscode.CodeAction {
		const action = new vscode.CodeAction(
			`Wrap with ${element}`,
			vscode.CodeActionKind.QuickFix
		);

		const abbreviationArgument = isTailwindEnabled ? `${element}.` : element;

		action.command = {
			command: 'reactCodeActions.wrapElement',
			title: 'Wrap with abbreviation',
			arguments: [abbreviationArgument],
		};

		return action;
	}

	private createCommand(commandString: string): vscode.CodeAction {
		const action = new vscode.CodeAction(
			'Learn more...',
			vscode.CodeActionKind.Empty
		);
		action.command = {
			command: commandString,
			title: 'Learn more about emojis',
			tooltip: 'This will open the unicode emoji page.',
		};
		return action;
	}
}

export function deactivate() {}
