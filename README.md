# React Actions

Inspired by Flutter's code actions for easily wrapping widgets. Implemented using the Emmet command [Wrap with Abbreviation](https://docs.emmet.io/actions/wrap-with-abbreviation/)

## Features

**Code Actions:**

- Wrap components with elements/components.

![GIF](https://github.com/kgni/React-Code-Actions/assets/84397151/de30238a-48b4-481a-8688-9b2442a1858f)

- Remove tag and its matching closing tag

![GIF](https://github.com/kgni/React-Code-Actions/assets/84397151/a043a1ff-fadd-406a-9834-913df86e6032)

**Environment-sensitive Wrappers:**

- Define wrapping components based on React Web or React Native.

**Monorepo Support:**

- Option to specify paths where the React Web and React Native code actions should be applied

## Requirements

To use this extension, you need to have emmet enabled (enabled by default).

## Extension Settings

#### React Web / React Native

- `reactCodeActions.reactWeb/reactNative.enableCodeActions` - Enable/disable code actions
- `reactCodeActions.reactWeb/reactNative.folderPaths` - Paths where the code actions should be available (useful for monorepos)
- `reactCodeActions.reactWeb/reactNative.wrappingElements` - List of elements that will be available in code actions (extendable to your own needs)

#### General

- `reactCodeActions.general.enableClassNameProp` - Automatically add a `className` property to the wrapping element - _disabled by default_.

- `reactCodeActions.general.enableRemoveTagAction` - Enables a remove tag action that will remove the selected tag and its matching closing tag - _disabled by default_

## Default Settings

Only React Web code actions are enabled by default

### Default Elements

#### React Web

- `div`, `section`, `article`, `main`, `header`, `footer`, `nav`, `aside`

#### React Native

- `View`, `ScrollView`, `Pressable`, `TouchableOpacity`, `Text`

## Known Issues

1. The actions will appear in all JSX or TSX files, regardless of the cursor position. This will be fixed in the future so that the cursor must either be inside an element or have text selected.
2. No automatic imports will be performed if the import statement for the wrapping component does not exist in the file. This functionality is expected to be implemented in the future.
3. if the className setting is not enabled the cursor will jump to the closing wrapping tag, which may not be desired. A setting will be available in the future to determine the cursor placement.
