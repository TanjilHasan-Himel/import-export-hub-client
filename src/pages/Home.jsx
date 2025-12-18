import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

const Home = () => {
    useTitle("Global Logistics Hub");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products?sort=latest')
            .then(res => res.json())
            .then(data => setProducts(data.slice(0, 6)));
    }, []);

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Professional Hero Section */}
            <div className="relative h-[500px] w-full bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1494412574643-35d324698420?q=80&w=2070&auto=format&fit=crop')"}}>
                <div className="absolute inset-0 bg-corporate-900/80"></div>
                <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-start text-white">
                    <span className="bg-secondary text-xs font-bold px-2 py-1 uppercase tracking-widest mb-4">Global Trade Platform</span>
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                        Seamless Import <br/> & Export Solutions.
                    </h1>
                    <p className="max-w-xl text-gray-300 text-lg mb-8">
                        Connect with 10,000+ verified suppliers. Manage your entire supply chain from a single dashboard with real-time inventory tracking.
                    </p>
                    <div className="flex gap-4">
                        <Link to="/all-products" className="btn btn-secondary border-none rounded-sm px-8 uppercase font-bold text-white hover:bg-white hover:text-corporate-900 transition-colors">Find Products</Link>
                        <Link to="/add-export" className="btn btn-outline border-white text-white rounded-sm px-8 uppercase font-bold hover:bg-white hover:text-corporate-900 hover:border-white">Start Selling</Link>
                    </div>
                </div>
            </div>

            {/* Trusted By Banner */}
            <div className="bg-white border-b py-6">
                <div className="container mx-auto px-6 flex justify-between items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500 overflow-x-auto">
                    {/* Placeholder Logos for "Trust" effect */}
                    <span className="text-xl font-bold italic">MAERSK</span>
                    <span className="text-xl font-bold italic">CMA CGM</span>
                    <span className="text-xl font-bold italic">EVERGREEN</span>
                    <span className="text-xl font-bold italic">HAPAG-LLOYD</span>
                    <span className="text-xl font-bold italic">MSC</span>
                </div>
            </div>

            {/* Latest Shipments Grid */}
            <div className="container mx-auto px-6 py-20">
                <div className="flex justify-between items-end mb-10 border-b pb-4 border-gray-200">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800">Latest Cargo Listings</h2>
                        <p className="text-slate-500 mt-1">Freshly added inventory available for immediate export.</p>
                    </div>
                    <Link to="/all-products" className="text-secondary font-bold hover:underline">View All Cargo &rarr;</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map(product => (
                        <div key={product._id} className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                            <div className="relative h-64 overflow-hidden">
                                <img src={product.productImage} alt={product.productName} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide text-slate-800 shadow-sm">
                                    {product.origin}
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-secondary transition-colors">{product.productName}</h3>
                                        <div className="flex items-center gap-1 text-amber-400 text-sm">
                                            <span>★★★★★</span>
                                            <span className="text-slate-400 ml-1 text-xs">({product.rating}.0)</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-slate-900">${product.price}</p>
                                        <p className="text-xs text-slate-500">per unit</p>
                                    </div>
                                </div>
                                
                                <div className="bg-slate-50 p-3 rounded text-sm text-slate-600 mb-6 flex justify-between">
                                    <span>Stock Available:</span>
                                    <span className="font-bold text-slate-900">{product.availableQuantity} units</span>
                                </div>

                                <Link to={`/product/${product._id}`} className="btn btn-primary w-full rounded-sm uppercase font-bold text-xs tracking-wider">
                                    View Manifest Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="bg-corporate-900 py-20 text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">Subscribe to Market Intelligence</h2>
                    <p className="text-slate-300 mb-8 max-w-2xl mx-auto">Get weekly reports on global shipping rates, tariff updates, and new high-demand export categories.</p>
                    <div className="join w-full max-w-md">
                        <input className="input input-bordered join-item w-full text-slate-900" placeholder="Enter corporate email" />
                        <button className="btn btn-secondary join-item px-8">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;