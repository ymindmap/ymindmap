import { View } from './view'
import type { Text } from 'leafer-ui'

export class TextView extends View<Text> {
    pointFromPos(pos: number) {
        return { object: this.ui, offset: pos };
    }
}