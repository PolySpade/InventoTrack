import React, { useContext, useMemo, useState } from 'react';
import { DashboardContext } from '../../contexts';

const ITEMS_PER_PAGE = 6;
const MAX_PAGE_BUTTONS = 5;

const BestSellerThisWeekTable = () => {
    const { ordersData: orders } = useContext(DashboardContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [inputPage, setInputPage] = useState('');

    const filteredOrders = useMemo(() => {
        const now = new Date();
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        startOfWeek.setHours(0, 0, 0, 0);
        const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
        endOfWeek.setHours(23, 59, 59, 999);

        return orders.filter(order => {
            const orderDate = new Date(order.timestamp);
            return orderDate >= startOfWeek && orderDate <= endOfWeek;
        });
    }, [orders]);

    const bestSellers = useMemo(() => {
        const productMap = {};

        filteredOrders.forEach(order => {
            order.products.forEach(product => {
                const sku = product.productId.sku;
                if (!productMap[sku]) {
                    productMap[sku] = {
                        name: product.name,
                        orders: 0,
                        totalRevenue: 0
                    };
                }
                productMap[sku].orders += product.quantity;
                productMap[sku].totalRevenue += product.price * product.quantity;
            });
        });

        return Object.entries(productMap).map(([sku, data]) => ({
            sku,
            ...data
        })).sort((a, b) => b.orders - a.orders);
    }, [filteredOrders]);

    const totalPages = Math.ceil(bestSellers.length / ITEMS_PER_PAGE);
    const currentItems = bestSellers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePageInputChange = (e) => {
        const page = e.target.value;
        if (!isNaN(page) && page > 0 && page <= totalPages) {
            setInputPage(page);
        } else {
            setInputPage('');
        }
    };

    const handlePageInputSubmit = () => {
        if (inputPage) {
            handlePageChange(Number(inputPage));
        }
    };

    const renderPaginationButtons = () => {
        const paginationButtons = [];
        const startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_BUTTONS / 2));
        const endPage = Math.min(totalPages, currentPage + Math.floor(MAX_PAGE_BUTTONS / 2));

        if (currentPage > Math.floor(MAX_PAGE_BUTTONS / 2) + 1) {
            paginationButtons.push(
                <button
                    key={1}
                    className={`join-item btn btn-sm ${currentPage === 1 ? 'btn-active' : ''}`}
                    onClick={() => handlePageChange(1)}
                >
                    1
                </button>
            );
            if (startPage > 2) {
                paginationButtons.push(
                    <span key="start-ellipsis" className="join-item btn btn-sm">...</span>
                );
            }
        }

        for (let i = startPage; i <= Math.min(endPage, totalPages); i++) {
            paginationButtons.push(
                <button
                    key={i}
                    className={`join-item btn btn-sm ${currentPage === i ? 'btn-active' : ''}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages - 1) {
            paginationButtons.push(
                <span key="end-ellipsis" className="join-item btn btn-sm">...</span>
            );
        }

        if (endPage < totalPages) {
            paginationButtons.push(
                <button
                    key={totalPages}
                    className={`join-item btn btn-sm ${currentPage === totalPages ? 'btn-active' : ''}`}
                    onClick={() => handlePageChange(totalPages)}
                >
                    {totalPages}
                </button>
            );
        }

        paginationButtons.push(
            <input
                key="input"
                type="text"
                value={inputPage}
                onChange={handlePageInputChange}
                onKeyPress={(e) => e.key === 'Enter' && handlePageInputSubmit()}
                className="join-item text-white input input-sm"
                placeholder="Go to"
                style={{ width: '80px' }}
            />
        );

        return paginationButtons;
    };

    return (
        <div className='bg-neutral p-6 rounded-lg h-[27rem]'>
            <h2 className="text-lg font-bold mb-4">Top Performing Products This Week</h2>
            <div className="rounded-lg grid grid-cols-2 gap-4">
                {currentItems.map((product, index) => (
                    <div key={product.sku} className="flex items-center p-4 bg-base-100 bg-opacity-40 rounded-lg">
                        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-base-200 rounded-full text-white text-lg font-bold">
                            {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                        </div>
                        <div className="ml-4">
                            <div className="text-2xl font-bold text-white pr-1">{product.sku}</div>
                            <div className="text-sm text-gray-400">{product.orders}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-3">
                <div className="join">
                    {renderPaginationButtons()}
                </div>
            </div>
        </div>
    );
};

export default BestSellerThisWeekTable;
