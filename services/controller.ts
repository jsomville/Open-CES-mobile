import * as SecureStore from 'expo-secure-store';
import { router } from "expo-router";

import { getCurrency } from "./currency";
import { refreshAccessToken, logout } from "./login";
import { getTransaction } from "./transaction";
import config from '@/app/config';
import { getUserDetails } from "./userDetail";
import { send } from './send';
import { getAccountFromEmail, getAccountFromPhone } from './accountService';
import { register } from './register';

export const fetchUserDetails = async () => {

    let result = await getUserDetails();
    if (result) {
        if (result.status === 403) {

            console.log("Refreshing Access Token...");

            // Access token expired, refresh it
            await refreshAccessToken();

            // Retry fetching user details
            result = await getUserDetails();
        }

        // Logic here to extract the correct info from the user data
        // get this app currency account from symbol
        const data = await SecureStore.getItemAsync('userData');
        if (data) {
            const userData = JSON.parse(data);

            const account = userData.accounts.find(
                (acc: any) => acc.currencySymbol === config.app_currency_symbol);

            if (account) {
                // Store account data
                const accountData = JSON.stringify(account);
                await SecureStore.setItemAsync('account', accountData);
            }
        }
    }
    else {
        console.log("ERROR : fetchUserDetails failed - no result");
    }

    return result;
}

export const fetchCurrency = async () => {
    const currency = await SecureStore.getItemAsync('currency');
    if (currency == null) {
        await getCurrency();
    }
}

export const fetchTransaction = async () => {

    let result = await getTransaction();

    if (result && result.status === 403) {

        console.log("REFRESHING : Access token expired, refreshing...");

        // Access token expired, refresh it
        await refreshAccessToken();

        // Retry fetching transactions
        result = await getTransaction();
    }

    return result;
}

export const performLogout = async () => {
    const result = await logout();

    if (result && result.status === 200) {
        console.log("Clearing stored data after logout");

        router.replace("/login");

        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
        await SecureStore.deleteItemAsync('userData');
        await SecureStore.deleteItemAsync('account');
        await SecureStore.deleteItemAsync('currency');
    }
}

export const sendTo = async (account: string, amount: number, description: string) => {

    console.log("Controller Send to:", account, amount, description);

    let result = await send(account, amount, description);
    if (result) {
        if (result.status === 403) {
            console.log("Send to - Refreshing Access Token...");

            // Access token expired, refresh it
            await refreshAccessToken();

            result = await send(account, amount, description);
        }

        if (result) {
            if (result.status === 201) {
                console.log("Send successful");
                router.back();
            }
            else {
                console.log("ERROR : sendTo failed with status", result.status);
            }
        }
        else {
            console.log("ERROR : sendTo failed - no result after retry");
        }
    }
    return result;
}

export const fetchAccountFromEmail = async (email: string) => {
    // Dummy function to simulate fetching account from email

    const symbol = config.app_currency_symbol;

    console.log("Fetching account for email:", email, "symbol:", symbol);

    const result = await getAccountFromEmail(email, symbol);
    if (result.status == 200) {

        const sentAccountDetail = await SecureStore.getItemAsync('sentAccountData');
        // TODO : Store in favorites
    }
    return result;
}

export const fetchAccountFromPhone = async (phone: string) => {
    // Dummy function to simulate fetching account from phone number

    const symbol = config.app_currency_symbol;

    console.log("Fetching account for phone:", phone, "symbol:", symbol);

    const result = await getAccountFromPhone(phone, symbol);
    if (result.status == 200) {
        const sentAccountDetail = await SecureStore.getItemAsync('sentAccountData');
        // TODO : Store in favorites
    }
    return result;
}

export const performRegister = async (firstname: string, lastname: string, email: string,  phone: string,region: string, password: string) => {
    console.log("Performing registration for:", email);

    const symbol = config.app_currency_symbol;

    const result = await register(symbol, firstname, lastname, email, phone, region, password);

    if (result && result.status === 201) {
        console.log("Registration successful");
        router.push("/login/confirm");
    }

    console.log("Registration result:", result);

    return result

}