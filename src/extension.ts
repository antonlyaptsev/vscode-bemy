'use strict';

import { execSync } from 'child_process';

import * as vscode from 'vscode';
import { Observable } from 'rxjs';

import { Config } from './config.interface';
import { getConfigPath } from './utils';

export function activate(context: vscode.ExtensionContext) {
    let bemyCreate = vscode.commands.registerCommand('extension.bemyCreate', (uri: vscode.Uri) => {
        let config: Config = <Config>vscode.workspace.getConfiguration('bemy');

        let templateInputDialog = Observable.from(
            vscode.window.showInputBox(
                { prompt: 'Please enter file type' }
            )
        );

        templateInputDialog
            .do(value => {
                if (!value) {
                    throw new Error('You should enter file type');
                }
            })
            .do(type => {
                let addToGit: string = config.addToGit ? '-g' : '';
                let bemyConfigPath: string = getConfigPath(config);
                let configArg: string = bemyConfigPath ? `-c ${bemyConfigPath}` : '';

                const command = `bemy -t create -f ${uri.fsPath} -p "${type}" ${addToGit} ${configArg}`;
                execSync(command, { cwd: vscode.workspace.rootPath });
            })
            .subscribe(
                () => vscode.window.setStatusBarMessage('File created', 5000),
                err => vscode.window.showErrorMessage(err.message)
            );
    });

    let bemyRename = vscode.commands.registerCommand('extension.bemyRename', (uri: vscode.Uri) => {
        let config: Config = <Config>vscode.workspace.getConfiguration('bemy');

        let templateInputDialog = Observable.from(
            vscode.window.showInputBox(
                { prompt: 'Please enter new name' }
            )
        );

        templateInputDialog
            .do(value => {
                if (!value) {
                    throw new Error('You should enter new name');
                }
            })
            .do(newName => {
                let addToGit: string = config.addToGit ? '-g' : '';
                let bemyConfigPath: string = getConfigPath(config);
                let configArg: string = bemyConfigPath ? `-c ${bemyConfigPath}` : '';
                let deepRename: string = config.deepRename ? '-d' : '';

                const command = `bemy -t rename -f ${uri.fsPath} -p "${newName}" ${addToGit} ${deepRename} ${configArg}`;
                execSync(command, { cwd: vscode.workspace.rootPath });
            })
            .subscribe(
                () => vscode.window.setStatusBarMessage('Files renamed', 5000),
                err => vscode.window.showErrorMessage(err.message)
            );
    });

    let bemyDefault = vscode.commands.registerCommand('extension.bemyDefault', (uri: vscode.Uri) => {

        const command = `bemy -f ${uri.fsPath}`;

        Observable
            .from(
                execSync(command, { cwd: vscode.workspace.rootPath })
            )
            .subscribe(
                () => vscode.window.setStatusBarMessage('Task executed', 5000),
                err => vscode.window.showErrorMessage(err.message)
            );
    });

    context.subscriptions.push(bemyCreate);
    context.subscriptions.push(bemyRename);
    context.subscriptions.push(bemyDefault);
}

export function deactivate() {}