import {type ReactNode} from "react";
import * as motion from "motion/react-client";

const ScaleUp = ({ children }: {children: ReactNode}) => {
    return (
        <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
        >
            {children}
        </motion.div>
    );
}

export default ScaleUp;