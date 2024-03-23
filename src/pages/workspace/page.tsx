import { Grid } from "entities/grid";
import { useEffect } from "react";
// import { Workspace } from "widgets/workspace/ui";

export default function Page() {
  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d", { alpha: false });

    let grid: Grid;
    let mouseStartX: number;
    let mouseStartY: number;

    let mousePosX = 0;
    let mousePosY = 0;

    function init() {
      if (!context) return;

      const stdCanvasW = document.body.clientWidth - 2 * canvas.offsetLeft;
      const stdCanvasH = stdCanvasW / 2;
      const optCanvasW = stdCanvasW * window.devicePixelRatio;
      const optCanvasH = stdCanvasH * window.devicePixelRatio;

      if (window.devicePixelRatio > 1) {
        canvas.width = optCanvasW;
        canvas.height = optCanvasH;
        context.scale(window.devicePixelRatio, window.devicePixelRatio);
      } else {
        canvas.width = stdCanvasW;
        canvas.height = stdCanvasH;
      }

      canvas.style.width = stdCanvasW + "px";
      canvas.style.height = stdCanvasH + "px";

      grid = new Grid({
        stdCanvasH,
        stdCanvasW,
        canvas,
        context,
        minCellSize: 20,
      });
      grid.draw();
    }

    init();

    window.addEventListener("resize", init);

    // Zoomer le canvas avec la roulette
    canvas.addEventListener("wheel", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const zoom = -e.deltaY / 5;
      grid.setZoom(zoom, mousePosX, mousePosY);
    });

    // Pan canvas on drag

    canvas.addEventListener("mousedown", function (e) {
      e.preventDefault();
      e.stopPropagation();

      mouseStartX = Math.round(e.clientX) - canvas.offsetLeft;
      mouseStartY = Math.round(e.clientY) - canvas.offsetTop;

      canvas.onmousemove = function (e) {
        e.preventDefault();
        e.stopPropagation();

        grid.setPan(mouseStartX, mouseStartY, mousePosX, mousePosY);
      };
    });

    //  Récupérer les coordonnées de la souris en mouvement.
    canvas.addEventListener("mousemove", function (e) {
      e.preventDefault();
      e.stopPropagation();

      mousePosX = Math.round(e.clientX) - canvas.offsetLeft;
      mousePosY = Math.round(e.clientY) - canvas.offsetTop;
    });

    canvas.addEventListener("mouseup", function (e) {
      e.preventDefault();
      e.stopPropagation();

      canvas.onmousemove = null;
      // canvas.onmousewheel = null;

      // Get last (0;0) coordinates
      grid.lastAxisPosX = grid.axisPosX;
      grid.lastAxisPosY = grid.axisPosY;
    });

    canvas.addEventListener("mouseout", function (e) {
      e.preventDefault();
      e.stopPropagation();

      canvas.onmousemove = null;
      // canvas.onmousewheel = null;

      // Get last (0;0) coordinates
      grid.lastAxisPosX = grid.axisPosX;
      grid.lastAxisPosY = grid.axisPosY;
    });
  }, []);
  // return <Workspace />;
  return (
    <div>
      <canvas id="canvas"></canvas>
    </div>
  );
}
