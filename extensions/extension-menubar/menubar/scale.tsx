/**
 * 调整缩放比例
 * mindmap.view.app.scale
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement, StatelessProps } from "tsx-create-element";
import { ZoomEvent } from "leafer-ui";
import type { MenubarProps } from "../type";

type ZoomButtonProps = StatelessProps<{
  getZoom: () => number;
  zoomTo: (value: number) => void;
}>;

const ZoomInButton = (props: ZoomButtonProps) => {
  return <button onClick={() => props.zoomTo(props.getZoom() - 0.1)}>-</button>;
};
const ZoomOutButton = (props: ZoomButtonProps) => {
  return <button onClick={() => props.zoomTo(props.getZoom() + 0.1)}>+</button>;
};

export const ScaleMenubar = (props: MenubarProps) => {
  const { app } = props.board.view;
  const getZoom = function () {
    const zoom: number = Array.isArray(app.tree.scale)
      ? app.tree.scale[0]
      : app.tree.scale;
    return zoom || 1;
  };
  const getProps = function (): ZoomButtonProps {
    return {
      getZoom,
      zoomTo: (value: number) => {
        app.zoom.call(app.tree, value);
        app.emit(ZoomEvent.ZOOM);
      },
    };
  };
  const childButtonProps = getProps();
  const zoomInButton = ZoomInButton(childButtonProps);
  const zoomOutButton = ZoomOutButton(childButtonProps);
  const zoomValue = (
    <div
      style={{
        textAlign: "center",
        width: "80px",
      }}
    ></div>
  );
  const update = function () {
    const currentZoom = getZoom();
    let zoom = currentZoom;

    if (zoom < props.options.min) zoom = props.options.min;
    (zoomInButton as unknown as HTMLButtonElement).disabled =
      zoom <= props.options.min;

    if (zoom > props.options.max) zoom = props.options.max;
    (zoomOutButton as unknown as HTMLButtonElement).disabled =
      zoom >= props.options.max;
    (zoomValue as unknown as HTMLDivElement).innerHTML =
      `${(zoom * 100).toFixed(0)}%`;
    if (zoom !== currentZoom) childButtonProps.zoomTo(zoom);
  };
  props.board.view.app.on(ZoomEvent.ZOOM, update);
  update();

  return (
    <div style={{ left: 0, bottom: 0, display: "flex", flexDirection: "row" }}>
      {zoomInButton}
      {zoomValue}
      {zoomOutButton}
    </div>
  );
};

export default ScaleMenubar;
