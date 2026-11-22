import {readFileSync,writeFileSync,mkdirSync,readdirSync} from 'node:fs';
const artifact=JSON.parse(readFileSync(new URL('../artifacts/contracts/Token.sol/Token.json',import.meta.url)));
const target=new URL('../../token-ui/public/',import.meta.url);mkdirSync(target,{recursive:true});
writeFileSync(new URL('Token.json',target),JSON.stringify({abi:artifact.abi,bytecode:artifact.bytecode},null,2));
const folder=new URL('../artifacts/build-info/',import.meta.url);const name=readdirSync(folder).find(n=>n.endsWith('.json')&&!n.endsWith('.output.json'));
const info=JSON.parse(readFileSync(new URL(name,folder)));const verification=new URL('../../verification/',import.meta.url);mkdirSync(verification,{recursive:true});
writeFileSync(new URL('standard-input.json',verification),JSON.stringify(info.input,null,2));
writeFileSync(new URL('compiler.txt',verification),`Compiler: ${info.solcLongVersion}\nContract: ${Object.keys(info.input.sources).find(n=>n.endsWith('/Token.sol'))}:Token\nArguments: Study Token, STDY, 10000000000000000000000\n`);
console.log('ABI, bytecode and verification input exported');
