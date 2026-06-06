  const handleValidarCupón = async () => {
    if (!inputCupón.trim()) return;

    if (!user) {
      toast.error("Iniciá sesión para validar las restricciones del cupón");
      return;
    }

    try {
      const q = query(collection(db, "cupones"), where("codigo", "==", inputCupón.trim().toUpperCase()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error("El cupón ingresado no existe");
        return;
      }

      const couponId = querySnapshot.docs[0].id;
      const couponData = querySnapshot.docs[0].data();

      // 🔐 VALIDACIÓN: Si el cupón tiene un dueño asignado y no sos vos, te rebota
      if (couponData?.userId && couponData.userId !== user.uid) {
        toast.error("Este cupón es exclusivo para otra cuenta y no podés utilizarlo acá");
        return;
      }

      // 💰 Validación de monto mínimo seguro
      if (couponData?.montoMinimo && totalConReglas < couponData.montoMinimo) {
        toast.error(`Monto insuficiente. Este cupón requiere una compra mínima de $${couponData.montoMinimo.toLocaleString('es-AR')}`);
        return;
      }

      // 📅 Validación de fecha de expiración segura
      if (couponData?.fechaExpiracion) {
        const hoy = new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" });
        const [fechaHoy] = hoy.split(" ");
        const [dia, mes, anio] = fechaHoy.replace(",", "").split("/");
        const hoyFormateado = `${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;

        if (hoyFormateado > couponData.fechaExpiracion) {
          toast.error("Este cupón ya expiró");
          return;
        }
      }

      // 📊 Validación de límite de usos segura
      if (couponData?.limiteUsos !== undefined && couponData?.limiteUsos !== null) {
        if (couponData.usosActuales >= couponData.limiteUsos) {
          toast.error("Este cupón alcanzó su límite de usos disponibles");
          return;
        }
      }

      const qOrders = query(collection(db, "orders"), where("uid", "==", user.uid));
      const ordersSnapshot = await getDocs(qOrders);

      const yaLoUso = ordersSnapshot.docs.some(doc => doc.data().cuponAplicadoId === couponId);
      if (yaLoUso) {
        toast.error("Ya utilizaste este cupón en una compra anterior");
        return;
      }

      setDescuento(couponData.porcentaje || 0);
      setCupónAplicado(couponData.codigo);

      localStorage.setItem("active_coupon_id", couponId);
      localStorage.setItem("active_coupon_pct", String(couponData.porcentaje || 0));
      localStorage.setItem("active_coupon_min", String(couponData.montoMinimo || 0));

      toast.success(`Cupón ${couponData.codigo} aplicado: ${couponData.porcentaje}% de descuento`);

    } catch (error) {
      console.error("Error en validación:", error);
      toast.error("Error al procesar la validación");
    }
  };
