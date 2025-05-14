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
    color: COLORS.secondaryText,
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
    backgroundColor: COLORS.input,
    color: COLORS.text,
    padding: 12,
    borderRadius: 5,
    marginBottom: 15,
    width: "100%",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.input,
    padding: 1,
    borderRadius: 5,
    marginBottom: 15,
    width: "100%",
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
    color: COLORS.textLittle,
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