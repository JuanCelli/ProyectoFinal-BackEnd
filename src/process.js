import { Command } from 'commander';

const program = new Command();

program
    .option('-d', 'Varaible para debug', false)
    .option('-p <port>', 'Puerto del servidor', 8080)
    .option('--mode <mode>', 'Modo de trabajo', 'dev')
    .option('-a --auth', 'Autenticado, no requiere permisos para utilizar endpoints')

    .requiredOption('-u <user>', 'Usuario que va a utilizar el aplicativo.', 'No se ha declarado un usuario.')
program.parse()



export default program;