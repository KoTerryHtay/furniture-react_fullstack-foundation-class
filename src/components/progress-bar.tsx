import { useIsFetching } from "@tanstack/react-query";
import { useNavigation } from "react-router";

export default function ProgressBar() {
  const navigation = useNavigation();
  const fetching = useIsFetching() > 0;

  if (fetching || navigation.state !== "idle") {
    return (
      <div className="fixed top-0 left-0 z-50 h-1 w-full overflow-hidden bg-gray-200">
        <div className="animate-progress absolute h-full w-2/3 bg-green-600" />
      </div>
    );
  }

  return null;
}
