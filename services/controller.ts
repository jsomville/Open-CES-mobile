import config from '@/app/config';
import { getUserDetails } from "@/services/userDetail";
import * as SecureStore from 'expo-secure-store';
import { getCurrency } from "./currency";
import { refreshAccessToken } from "./login";
import { getTransaction } from "./transaction";

export const fetchUserDetails = async () => {

    let result = await getUserDetails();
    if (result){
        if (result.status === 401) {

            console.log("REFRESHING : Access token expired, refreshing...");
            
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
                (acc : any) => acc.currencySymbol === config.app_currency_symbol);

            if (account) {
                // Store account data
                const accountData = JSON.stringify(account);
                await SecureStore.setItemAsync('account', accountData);
            }
        }
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

    if (result){
        if (result.status === 401) {

            console.log("REFRESHING : Access token expired, refreshing...");

            // Access token expired, refresh it
            await refreshAccessToken();

            // Retry fetching transactions
            result = await getTransaction();
        }
    }
   
    return result;
}