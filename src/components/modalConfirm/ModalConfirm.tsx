import './ModalConfirm.scss'

interface ModalconfirmProps {
  handleDelete: () => void
  handleCancelModalDelete: () => void
}

function ModalConfirm({ handleDelete, handleCancelModalDelete }: ModalconfirmProps) {
  return (
    <div className="modal-confirm">
      <div className="modal_overlay">
        <div className="modal_body">
          <span className="title"> Are you sure you want to delete?</span>
          <div>
            <button className="btn-yes" onClick={handleDelete}>
              Yes
            </button>
            <button className="btn-no" onClick={handleCancelModalDelete}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalConfirm
