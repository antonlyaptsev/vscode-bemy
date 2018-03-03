import { existsSync } from 'fs';
import { resolve } from 'path';

import * as vscode from 'vscode';

import { Config } from './config.interface';

export function getConfigPath(config: Config): string {
  let path: string;
  const rootPath: string = vscode.workspace.rootPath || './';

  path = config.configPath.replace('${workspaceRoot}', rootPath);
  if (existsSync(path)) {
    return path;
  }

  path = resolve(rootPath, '.bemy.json');
  if (existsSync(path)) {
    return path;
  }

  return '';
}