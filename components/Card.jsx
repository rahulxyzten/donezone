import { motion } from "framer-motion";
import { MdDeleteOutline } from "react-icons/md";
import { GrEdit } from "react-icons/gr";

const Card = ({ data, reference, handleDelete, handleEdit }) => {
  return (
    <motion.div
      drag
      dragConstraints={reference}
      whileDrag={{ scale: 1.1 }}
      dragElastic={0.1}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
      className="relative flex-shrink-0 w-60 h-64 rounded-[45px] bg-zinc-900/90 text-white px-8 py-10 overflow-hidden"
    >
      <div className="footer absolute top-0 left-0 w-full ">
        <div className="flex items-center justify-between px-8 py-3 mt-3">
          <h5>Do.</h5>
          <h5>It.</h5>
        </div>
      </div>
      <div className="py-auto h-36 flex items-center justify-center">
        <p className="leading-tight text-xl mt-5 font-semibold">{data.item}</p>
      </div>
      <div className="footer absolute bottom-0 left-0 w-full ">
        <div className="flex items-center justify-between px-8 py-3 mb-3">
          <span
            onClick={handleEdit}
            className="w-7 h-7 z-[3] cursor-pointer bg-zinc-600 rounded-full flex items-center justify-center"
          >
            <GrEdit size=".9em" color="#fff" />
          </span>
          <span
            onClick={handleDelete}
            className="w-7 h-7 z-[3] cursor-pointer bg-zinc-600 rounded-full flex items-center justify-center"
          >
            <MdDeleteOutline size=".9em" color="#fff" />
          </span>
        </div>
        {/* {data.tag.isOpen && (
          <div
            className={`tag w-full py-4 ${
              data.tag.tagColor === "blue" ? "bg-blue-600" : "bg-green-600"
            } flex items-center justify-center`}
          >
            <h3 className="text-sm font-semibold">{data.tag.tagTitle}</h3>
          </div>
        )} */}
      </div>
    </motion.div>
  );
};

export default Card;
