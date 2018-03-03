# Bemy for Visual Studio Code

VS Code extention to work with Bemy CLI

## Usage

- Call context menu (in explorer or editor)
- Select one of three BEMY tasks
- Follow the instructions

![Use Extension](images/newTutorial.gif)

## Tasks
- `create` - creates new file with given type or files(separated by space)
- `rename` - renames all the block
- `default` - depends on target file. Creates deps structure or calls `create` task

## Config
- `addToGit` - adds to git added or renamed files
- `deepRename` - renames files content while `rename` task
- `configPath` - path to your `.bemy.json`

## Bemy
Full documentation can be found [there](https://github.com/f0rmat1k/bemy)