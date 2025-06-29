import FavoriteHeader from "./FavoriteHeader";

interface LoadingStateProps {
  title?: string;
  message?: string;
}

export default function LoadingState({
  title = "favorites",
  message = "Loading...",
}: LoadingStateProps) {
  return (
    <div className="container mx-auto max-w-6xl p-4">
      <FavoriteHeader title={title} description={message} />
    </div>
  );
}
