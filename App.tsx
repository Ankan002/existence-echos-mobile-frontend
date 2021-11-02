import { StatusBar } from "expo-status-bar";
import React, {useEffect} from "react";
import { RecoilRoot } from "recoil";
import { useRecoilState } from "recoil";
import { authenticatedState } from "./atom/authenticatedAtom";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <RecoilRoot>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
      </RecoilRoot>
    );
  }
}
