export type Provider={request:(args:{method:string;params?:unknown[]|object})=>Promise<unknown>;on?:(event:string,fn:()=>void)=>void;removeListener?:(event:string,fn:()=>void)=>void};
export async function request<T>(provider:Provider,args:{method:string;params?:unknown[]|object},timeout=30000):Promise<T>{
 let timer:ReturnType<typeof setTimeout>|undefined;
 try{return await Promise.race([provider.request(args) as Promise<T>,new Promise<never>((_,reject)=>{timer=setTimeout(()=>reject(Error('MetaMask не ответил. Откройте расширение и завершите ожидающий запрос.')),timeout);})]);}
 catch(e){const code=(e as {code?:number})?.code;if(code===-32002)throw Error('В MetaMask уже есть ожидающий запрос. Откройте расширение и завершите его.');if(code===4001)throw Error('Запрос отклонён в MetaMask.');throw e;}
 finally{if(timer!==undefined)clearTimeout(timer);}
}
