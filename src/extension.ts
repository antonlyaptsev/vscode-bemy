'use strict';

import { execSync } from 'child_process';

import * as vscode from 'vscode';
import { Observable } from 'rxjs';

import { CreateConfig } from './config.interface';

export function activate(context: vscode.ExtensionContext) {
    let genBEMFile = vscode.commands.registerCommand('extension.newBEMFile', (uri: vscode.Uri) => {
        let createConfig: CreateConfig = <CreateConfig>vscode.workspace.getConfiguration('bemy.create');

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
                let addToGit: string = createConfig.addToGit ? '-g' : '';

                const command = `bemy -t create -f ${uri.fsPath} -p "${type}" ${addToGit}`;
                execSync(command, { cwd: vscode.workspace.rootPath });
            })
            .subscribe(
                () => vscode.window.setStatusBarMessage('File created', 5000),
                err => vscode.window.showErrorMessage(err.message)
            );
    });

    context.subscriptions.push(genBEMFile);
}

export function deactivate() {}