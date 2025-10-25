import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import config from '../app/config';

export const send = async (account: string, amount: number, description: string) => {

    const data = await SecureStore.getItemAsync('account');
    if (data) {
        const accountData = JSON.parse(data);

        // Perform the transfer request
        const url = `${config.api_base_url}/api/account/${accountData.id}/transferTo`;
        const token = await SecureStore.getItemAsync('accessToken');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        const body = {
            account: parseInt(account),
            amount,
            description
        };

        try {
            const response = await axios.post(url, body, {
                headers,
                validateStatus: (status) => status < 500
            });

            if (response.status == 201) {
                return {
                    status: response.status,
                    message: "OK"
                };
            }
            else {
                return {
                    status: response.status,
                    message: response.data.error
                };
            }
        } catch (error) {
            console.error("Error sending transaction:", error);
            throw error;
        }
    }
    return {
        status: 999,
        message: "Missing current account information"
    };
};