import "./ModalLoading.scss";
interface ModalLoadingProps {
  title: string;
}
function ModalLoading({ title }: ModalLoadingProps) {
  return (
    <div className="modal">
      <div className="modal_overlay">
        <div className="modal_body">
          <div className="loading"></div>
          <span className="title">{title}</span>
        </div>
      </div>
    </div>
  );
}

export default ModalLoading;
