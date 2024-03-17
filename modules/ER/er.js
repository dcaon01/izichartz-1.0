import Workpane from '@/components/modules/general/Workpane.js';
import Rectangle from '@/components/modules/graphics/Rectangle.js';

export default function ER() {
    let components = [];
    let wpHeight = 0;
    let wpWidth = 0

    if (components.length === 0) {
        wpWidth = 1920;
        wpHeight = 720;
    }

    return (
        <>
            <Workpane h={wpHeight} w={wpWidth}>
                <Rectangle t={"culo"} x={150} y={200}/>
            </Workpane>
        </>
    );
}