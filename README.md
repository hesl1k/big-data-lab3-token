# Лабораторная работа 3 — ERC-20

Study Token (STDY), 18 знаков после запятой, начальный выпуск 10 000 токенов.

Контракт реализует IERC20 и IERC20Metadata OpenZeppelin с самостоятельной логикой балансов и разрешений, как в методичке. Начальный выпуск зачисляется создателю и сопровождается Transfer от нулевого адреса. mint доступен только owner; предусмотрена передача владения с OwnershipTransferred. Нулевые адреса получателя и нового владельца запрещены.

## Состав

- token-contract — Hardhat 3, Solidity 0.8.30, OpenZeppelin 5.6.1, Viem, Ignition и 12 тестов.
- token-ui — Next.js, React, Web3.js; подключение MetaMask, баланс, перевод, выпуск владельцем, передача владения, wallet_watchAsset.
- verification — полный стандартный JSON-вход компилятора для верификации.
- evidence — результаты проверок и скриншоты.

Интерфейс содержит только функциональные элементы. Пересчёт сумм выполняется через BigInt с использованием decimals контракта, без floating point. Для ввода поддерживаются точка и запятая. Токен не является платёжным средством и используется для лабораторной в тестовой сети.

## Запуск

Нужен Node.js >=22.13; проверено с 24.22.3. В обеих папках установить зависимости `npm ci` из современного Node/npm. При использовании Nodist убедиться, что npm и node используют одну версию Node. На Windows для EDR требуется optional package @nomicfoundation/edr-win32-x64-msvc, он указан в package.json.

1. token-contract: `npm test`, затем `node scripts/prepare.mjs`.
2. token-contract, отдельный терминал: `npm run node`.
3. token-contract: `npm run deploy:local`, затем `node scripts/check-local.mjs` (на чистом узле).
4. token-ui: `npm test`, `npm run build`, `npm start`.
5. Открыть http://127.0.0.1:3001 и выбрать сеть. Для локального узла приложение прочитает deployment.local.json.

Можно использовать run.ps1 в корне проекта, он запускает команды с Node из установленного Codex runtime либо доступным node. `./run.ps1 contract-test`, `./run.ps1 ui-test`, `./run.ps1 build`, `./run.ps1 start`, `./run.ps1 node`.

## Использование

Подключить MetaMask в выбранной сети. Для готового токена указать адрес и нажать «Открыть». Для нового раскрыть «Создать токен», заполнить название, символ и начальное количество; подтвердить создание в MetaMask. Первоначальный выпуск и права владельца получит аккаунт, подписавший создание.

В форме перевода указать ненулевой адрес и количество токенов. Владелец дополнительно видит форму выпуска. Обе операции требуют подтверждения MetaMask. Кнопка «Добавить в MetaMask» отправляет wallet_watchAsset; кошелёк самостоятельно решает, как показать запрос. Передача владения изменяет адрес, которому разрешён mint, но не переносит баланс токенов.

## Проверка

12 контрактных тестов проверяют начальную выдачу, метаданные, дробные и собственные переводы, запрет перерасхода, нулевые адреса, mint владельцем, отказ постороннему, передачу владения, approve/transferFrom и безлимитный allowance. Пять тестов интерфейсной логики проверяют преобразование сумм, минимальную единицу, большие числа, неверный ввод и тайм-аут MetaMask.

Локальная интеграционная проверка: переведено 1,25 STDY второму аккаунту и выпущено ещё 10 STDY на него. Баланс получателя 11,25 STDY, totalSupply 10 010 STDY. Результат сохранён в evidence/local-check.json.

## Sepolia

Контракт: `0x586da3bd74eE85533FcfcEBad3EDe343dE916e41`, блок создания `12191351`, Chain ID `11155111`. Адрес автоматически загружается из deployment.sepolia.json.

- Проверенный исходный код: https://eth-sepolia.blockscout.com/address/0x586da3bd74eE85533FcfcEBad3EDe343dE916e41?tab=contract
- Создание: https://eth-sepolia.blockscout.com/tx/0xd62637b51c1492ff87b537e5cd78fe36e8cfe580cb530245f132f8270169ab82
- Перевод 1,25 STDY: https://eth-sepolia.blockscout.com/tx/0x803e5692ec9ffdf6fa09b5b6720a97d23a3504aa3de27676cc0e58d6f4262508
- Выпуск 10 STDY: https://eth-sepolia.blockscout.com/tx/0x3f8b9d0d2411eaf007c789d7e177652afa197fa7c0368d72ef98c5c13b1dca41

Итог: totalSupply = 10010 STDY; баланс владельца = 10008,75 STDY; баланс тестового получателя = 1,25 STDY. Владелец — `0x0D1fB0277bD5581EC4365120AaB5C9b4B34fc49a`. Токен добавлен пользователем в MetaMask. Исходный код прошёл exact-match верификацию Sourcify и Blockscout. Автоматическая передача в Etherscan ограничена дневным лимитом сервиса; проверенный исходный код доступен по ссылке Blockscout.

Повторная проверка публичных данных: `node scripts/inspect-sepolia.mjs` в token-contract. Повторная отправка исходников на проверку: `node scripts/verify.mjs ADDRESS CREATION_TX`. Для проверки Etherscan через Hardhat можно задать ETHERSCAN_API_KEY и выполнить `npx hardhat verify --network sepolia ADDRESS "Study Token" "STDY" "10000000000000000000000"`.

Репозиторий: https://github.com/hesl1k/big-data-lab3-token

Ответы на контрольные вопросы в протокол не включаются.
