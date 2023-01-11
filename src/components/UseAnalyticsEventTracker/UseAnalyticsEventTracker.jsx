
import ReactGA from "react-ga";

//Component that sets up Google Analytics for all routes on the app
const useAnalyticsEventTracker = (category = "Blog category") => {
  const eventTracker = (action = "test action", label = "test label") => {
    ReactGA.event({ category, action, label });
  }
  return eventTracker;
}
export default useAnalyticsEventTracker;