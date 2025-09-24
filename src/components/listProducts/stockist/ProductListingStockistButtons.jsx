import { useNavigate } from "react-router-dom"

export default function ProductListingStockistButtons({ p }) {
    const navigate = useNavigate();
    return (
        <td className="actions">
            <button
                className="btn-edit"
                onClick={() => navigate(`/admin/product/edit/${p.id}`)}
            >
                Editar
            </button>
        </td>
    )
}