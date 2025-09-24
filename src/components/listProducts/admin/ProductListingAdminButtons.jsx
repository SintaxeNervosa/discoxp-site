import { useNavigate } from "react-router-dom"

export default function ProductListingAdminButtons({ p, changeStatusConfirm }) {
    const navigate = useNavigate();
    return (
        <td className="actions">
            <button
                className="btn-view"
            >
                View
            </button>
            <button
                className="btn-edit"
                onClick={() => navigate(`/admin/product/edit/${p.id}`)}
            >
                Editar
            </button>
            <label className="switch">
                <input
                    type="checkbox"
                    checked={p.status}
                    onClick={() => changeStatusConfirm()}
                />
                <span className="slider"></span>
            </label>
        </td>
    )
}