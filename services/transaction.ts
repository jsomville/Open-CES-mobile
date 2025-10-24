import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import config from '../app/config';

export const getTransaction = async () => {
  try {

    console.log('get transactions requested');

    // get the selected account
    const data = await SecureStore.getItemAsync('account');
    if (data) {
        const accountData = JSON.parse(data);

        // Perform the get transactions request
        const url = `${config.api_base_url}/api/account/${accountData.id}/transactions`;
        const token = await SecureStore.getItemAsync('accessToken');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        const response = await axios.get(url, {
            headers,
            validateStatus: (status) => status < 500 // treat 4xx as resolved, only 5xx as error
        });

        if (response.status === 200) {

            const transactions =  JSON.stringify(response.data);

            //Store Currency list
            await SecureStore.setItemAsync('transactions', transactions);

            return {
                status: 200,
                message: "OK",
            };
        } else {
            return {
                status: response.status,
                message: "Error retrieving transactions"
            };
        }
    } else {
        return {
            status: 400,
            message: "No account selected"
        };
    }
  } catch (error) {
      console.error('User detail failed:', error);
      throw error;
  }
};


