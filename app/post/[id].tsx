import { useLocalSearchParams } from "expo-router";
import React from "react";

function PostScreen() {
  const { id } = useLocalSearchParams();

  return <div>PostScreen {id}</div>;
}

export default PostScreen;
