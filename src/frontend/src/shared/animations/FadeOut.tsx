import {type ReactNode} from "react";
import * as motion from "motion/react-client";

const FadeIn = ({ children }: {children: ReactNode}) => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
}

export default FadeIn;