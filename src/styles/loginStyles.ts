import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const  styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontFamily: "Roboto",
    fontSize: 28,
    color: COLORS.text,
    marginBottom: 20,
  },
  subtitle: {
    color: "#ccc",
    marginBottom: 30,
    textAlign: "left",
    fontFamily: "Roboto",
    fontSize: 15,
    lineHeight: 20,
  },
  label: {
    fontFamily: "Roboto",
    color: COLORS.text,
    marginBottom: 5,
  },
  input: {
    fontFamily: "Roboto",
    backgroundColor: 'rgb(62, 62, 85)',
    color: COLORS.text,
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: 'rgb(62, 62, 85)',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  inputPassword: {
    fontFamily: "Roboto",
    flex: 1,
    color: COLORS.text,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 20,
    fontFamily: "Roboto",
  },
  containerForgot:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
  forgotText: {
    fontFamily: "Roboto",
    color: "#bbb",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  loginText: {
    fontFamily: "Roboto",
    color: COLORS.text,
  },
});