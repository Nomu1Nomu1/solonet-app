import express from "express";
import passport from "passport";

import { product, productById } from '../controller/ProductController.js';
import { getPromo } from '../controller/PromoController.js';
import { kategori }  from '../controller/kategoriController.js';
import { login, register, getUser, getUserById, updateUser, sendOtp, verifyOtp, resetPasswordRequest, resetPassword } from "../controller/UserController.js";
import { getPembelian } from "../controller/PembelianController.js";
import { verifyToken } from "./middleware/middleware.js";
import { addCustomer, getCustomer, getKabupatenByProvinsi, getKecamatanByKabupaten, getKelurahanByKecamatan, getProvinsi } from "../controller/customerController.js";


const router = express.Router();

// User
router.get("/users", verifyToken,getUser);
router.get("/users/:id", verifyToken, getUserById);
router.post("/register", register);
router.post("/login", login);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/request-otp", resetPasswordRequest);
router.post("/reset-password", resetPassword);
router.put("/updateUser/:id", verifyToken, updateUser);

// Customer
router.get("/customer", verifyToken, getCustomer);
router.post("/customer", addCustomer);
router.get("/provinsi", getProvinsi);
router.get("/kabupaten/:provinsi_id", getKabupatenByProvinsi );
router.get("/kecamatan/:kabupaten_id", getKecamatanByKabupaten );
router.get("/kelurahan/:kecamatan_id", getKelurahanByKecamatan );


// Product
router.get("/product", verifyToken, product);
router.get("/kategori", verifyToken, kategori);
router.get("/product-promo", verifyToken, getPromo);
router.get("/product/:id", verifyToken, productById );

// Pembelian
router.get("/pembelian", verifyToken ,getPembelian);

//google auth
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/product');  
    }
);

router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/logout');
    });
});


export default router;
