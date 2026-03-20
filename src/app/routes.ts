import { createBrowserRouter } from "react-router";
import SplashScreen from "./components/SplashScreen";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import OnboardingScreen from "./components/onboarding/OnboardingScreen";
import MainTabsScreen from "./components/main/MainTabsScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SplashScreen,
  },
  {
    path: "/login",
    Component: LoginScreen,
  },
  {
    path: "/register",
    Component: RegisterScreen,
  },
  {
    path: "/onboarding",
    Component: OnboardingScreen,
  },
  {
    path: "/main",
    Component: MainTabsScreen,
  },
]);
