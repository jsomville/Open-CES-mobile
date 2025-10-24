import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  loginContainer: {
    padding: 20,
    marginTop: 30,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContainer: {
    padding: 20,
    marginTop: 25,
    backgroundColor: '#fff',
    flex: 1,
  },
  mainContainer: {
    padding: 20,
    marginTop: 0,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  menuHeaderContainer: {
    flexDirection: "column",
    alignItems: "center",
    padding: 5,
    alignSelf: 'center'
  },
  transactionLogContainer: {
    width: '100%',
    flex: 1,
    marginTop: 10,
  },
  transactionLogHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    alignSelf: 'center'
  },
  actionButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    margin: 5,
    alignSelf: 'center'
  },
  buttonContainer: {
    alignItems: "center",
    padding: 5,
    alignSelf: 'center',
    justifyContent: "center",
  },
  accountNumber :{
    fontSize: 18,
    marginBottom: 5,
    color: '#333',
    alignSelf: 'center'
  },
  balanceText :{
    fontSize: 24,
    marginBottom: 5,
    color: "black"
  },
  login_image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 5,
  },
  menu_image: {
    width: 80,
    height: 80,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    margin: 10,
    backgroundColor: '#007AFF',
  },
  roundButton: {
    margin: 10,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 10,

  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    width: 250,
    borderRadius: 5,
    marginBottom: 16,
  },
  hyperlink: {
    color: 'blue',
    textDecorationLine: 'underline',
    margin: 10,
  },
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  transactionDate: {
    flex: 1,
    alignItems: "center", // Center-align day and month
  },
  transactionDay: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  transactionMonth: {
    fontSize: 14,
    color: "#666",
  },
  transactionType: {
    flex: 2,
    fontSize: 14,
    color: "#333",
    textAlign: "left",
  },
  transactionDescription: {
    flex: 2,
    fontSize: 14,
    color: "#333",
    textAlign: "left",
  },
  transactionAmountContainer: {
    flex: 1,
    justifyContent: "center", // Vertically center the amount
    alignItems: "center", // Horizontally center the amount
  },
  transactionAmount: {
    fontSize: 14,
    color: "#333",
  },
  smallButton: {
    backgroundColor: "#007BFF", // Blue button
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});

export default globalStyles;