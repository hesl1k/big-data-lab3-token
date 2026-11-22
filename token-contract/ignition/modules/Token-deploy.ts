import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
export default buildModule("TokenModule", m => ({token:m.contract("Token",["Study Token","STDY",10000n*10n**18n])}));
