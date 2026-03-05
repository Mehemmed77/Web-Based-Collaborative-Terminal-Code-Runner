import FadeIn from "@/shared/animations/FadeIn";
import ScaleUp from "@/shared/animations/ScaleUp";

export default function JoinRoom() {
  return (
    <FadeIn>
      <main className="re-flex-column-align-center main">
        <ScaleUp>
          <h1></h1>
        </ScaleUp>
      </main>
    </FadeIn>
  );
}
