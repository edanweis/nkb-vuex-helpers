# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.5.0] - 2021-03-01

### Added
- this changelog

#### Getters
- getChunk()
- getMin()
- getMax()

#### Mutators
- chunk()

### Changed
- Did a big restructure of the project and its tests to make it more maintainable and less of a wall of javascript
- Broke the readme in half and stuffed the usage examples in their respective folders.
- More general updates to the readme to make sure everything uses the example state object.

### Fixed
- filterNil() was only working on the top-level of objects. This has been corrected, and filterNil() now works on nested objects and arrays of objects using a recursive function.

## [0.3.0] - 2021-02-04

### Added

#### Getters
- getCase()
- filterNil()

#### Mutators
- toCase()

## [0.2.0] - 2021-01-28

### Added

#### Getters
- dayTimeFormatter()

## [0.1.0] - 2021-01-28

### Added

Initial release.

#### Mutators
- assignObject()
- increment()
- decrement()
- pushTo()
- removeRecordInList()
- replaceRecordInList()
- extendRecordInList()
- set()
- toggle()

#### Getters
- filterByKey()
- getByKey()
- getter()