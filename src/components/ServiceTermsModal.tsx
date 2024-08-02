"use client";

import ModalFrame from "./ModalFrame";

type ServiceTermsModalProps = {
  isShowing: boolean;
  closeModal: () => void;
};

export default function ServiceTermsModal({ isShowing, closeModal }: ServiceTermsModalProps) {
  if (!isShowing) return null;
  return (
    <ModalFrame title="서비스 이용약관" closeModal={closeModal}>
      <div className="w-100 h-52 p-4 overflow-hidden rounded-xl border bg-slate-100 border-slate-300">
        <div className="overflow-auto w-full h-full">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis incidunt exercitationem eveniet alias ullam
          sequi similique inventore, non natus quas nisi harum minus, sit ratione, veritatis error eum distinctio ab
          maxime tempora. Praesentium odio laboriosam ipsam aliquam quaerat. Nisi quos dolorem consequuntur. Placeat
          officia optio ab. Nam iste ipsum at? Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium ex
          id, amet ducimus alias eveniet aperiam dicta magni accusamus qui quo enim culpa nihil officia veritatis ad
          odio quaerat commodi laboriosam voluptatibus perferendis eligendi molestiae sequi. Consequuntur, quaerat.
          Minima quibusdam minus nostrum quis, corrupti placeat labore iste! Doloremque, hic eveniet!
        </div>
      </div>
    </ModalFrame>
  );
}
