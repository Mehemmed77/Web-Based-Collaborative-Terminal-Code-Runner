import FadeIn from "@/shared/animations/FadeIn";
import ScaleUp from "@/shared/animations/ScaleUp";

export default function CreateRoom() {
  return (
    <FadeIn>
      <main className="re-flex-column-align-center main">
        <ScaleUp>
          <a></a>
        </ScaleUp>
      </main>
    </FadeIn>
  );
}
