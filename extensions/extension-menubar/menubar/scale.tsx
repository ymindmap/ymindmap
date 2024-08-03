/**
 * 调整缩放比例
 * mindmap.view.app.scale
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement, StatelessProps } from 'tsx-create-element';
import { ZoomEvent } from 'leafer-ui';
import type { MenubarProps } from '../type'
// import type { MenubarRegister } from '../type'

type ZoomButtonProps = StatelessProps<{
    zoom: number,
    zoomTo: (value: number) => void
}>

const ZoomInButton = (props: ZoomButtonProps) => {
    return <div onClick={() => props.zoomTo(props.zoom - 0.1)}>-</div>
}
const ZoomOutButton = (props: ZoomButtonProps) => {
    return <div onClick={() => props.zoomTo(props.zoom + 0.1)}>+</div>
}

export const ScaleMenubar = (props: MenubarProps) => {
    const { app } = props.board.view;
    const getProps = function(): ZoomButtonProps {
        const zoom: number = Array.isArray(app.scale) ? app.scale[0] : app.scale;
        return {
            zoom,
            zoomTo: app.zoom.bind(app)
        }
    }
    const childButtonProps = getProps();
    const zoomInButton = ZoomInButton(childButtonProps);
    props.board.view.app.on(ZoomEvent.ZOOM, (e) => {
        console.log('需要更新子节点', e, zoomInButton);
    })

    return <div
                style={{ left: 0, bottom: 0, display: 'flex', 'flexDirection': 'row' }}
           >
            {zoomInButton}
            {<div style={{
                textAlign: 'center',
                width: '80px'
            }}>{childButtonProps.zoom * 100 + '%'}</div>}
            {ZoomOutButton(childButtonProps)}
           </div>;
}

export default ScaleMenubar;