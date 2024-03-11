# React Actions

Inspired by Flutter's code actions for easily wrapping widgets. Implemented using the Emmet command [Wrap with Abbreviation](https://docs.emmet.io/actions/wrap-with-abbreviation/)

## Features

**Code Actions:**

- Wrap components with elements/components.

![GIF](https://media.cleanshot.cloud/media/80486/6jWVDQhD1B2GRpOEV8aGcwVt0N0koQ19jdyF2QGm.gif?Expires=1710174933&Signature=q8ts6xPAZBe45qlHOqYAjBEmRbxS4-DdUvIZisBO75mPdJhMIzQCjdpYtEOmeGvXZNTTLF31Ix9MLvaioRZ-yCMOJcXYwnb4ftTefu4LCqbx0iTIJZFSAR0v1NItJ6xHr~ykWKwAsOjyFvvhHMvOWfrJ9MqIxbgF-IYtaUMCubsT59rmTjMFZ73MexqZrqn1-zq9l2kKhwjGsbe06VNhtWhRsDqWbKbKKFIfdiOzWpFhB8QDI9fsDsQoI86qYuneMIOe1sExJV096rmY0ro7qP0ho1CkuNsa4PPVxqJIeu5DZbG9UUZjUWlDNLtZWXbdWHrsbJgj-WxPc9JAqx-7NA__&Key-Pair-Id=K269JMAT9ZF4GZ)

- Remove tag + its matching closing tag

![GIF](https://media.cleanshot.cloud/media/80486/NQ0E0IXfRDLGtubwjw2jNKWmfy0hFPuVMo8Sk2k4.gif?Expires=1710175005&Signature=FK8DayaQPTrJZln2io~2gLbBRjRT6WS~QF5smhSFNBEVK7LJDDDklllkDgDEIPSnpYbZhzNIyin2icZgaIOJw~cWU78C0V9AFPE6jP6i2rsBDyUEwUzPyFUsrvVb4awjmWfpAzAwoGHJygIRiECOd58~CfmoblJaElzIHblzeBVXWKjZmdCcNop22IsNtc~N~AGjC58S4s6peFJohYApHV1WdKBNknGjKXN~YTd1NdURcLRme8oweez2GDSzLOz1hBD7hI-n9ToyDGhhSL2wVgZiyHCvkJLCKcSrPzR7be2aF5GT7fQnnTpg0onpwUMovqARZX4D6jN7vyeMS1b9ZQ__&Key-Pair-Id=K269JMAT9ZF4GZ)

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
