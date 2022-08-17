import { spawn } from 'child_process';
export async function ChildProcess(command: string, argsChildProcess: any) {
    try {
        return new Promise((resolve, reject) => {
            console.log("🚀 ~ file: video.controller.ts ~ line 33 ~ VideoController ~ ChildProcess ~ argsChildProcess", argsChildProcess)
            

            const options = { shell: true };
            const child = spawn(command, argsChildProcess, options);
            
            child.stdout.on('data', (data: any) => {
                console.log('stdout: ' + data);
            });

            child.stderr.on('data', (code: any) => {
                console.log('stderr: ' + code);
                resolve('Finished process =>' + code);
            });

            child.on('error', (code: any) => {
                reject('Errors in the process =>' + code);
            });

            child.on('message', (code: any) => {
                console.log('Message from the child process =>' + code);
            });
        });
    } catch (error) {
        console.log(
            '🚀 ~ file: video.controller.ts ~ line 21 ~ VideoController ~ yotubeDL ~ error',
            error
        );
        throw error;
    }
}