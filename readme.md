## Recursos utilizados: 
# Url de flujo en powerautomate : ms-powerautomate:/console/flow/run?environmentid=Default-585a4d92-db1d-4bbb-b5ac-c5299e3894e3&workflowid=992599a4-54fa-4935-8879-0b2daeca208d&source=Other
# Id del flujo : 992599a4-54fa-4935-8879-0b2daeca208d
# Api utilizada : https://rickandmortyapi.com/documentation/#get-all-characters
# Servidor Backend : Node.js
# Base de Datos PostgreSQL 15 
- Procedimiento almacenado implementado en base de datos : SistInvFact
# ==
    
    CREATE OR REPLACE PROCEDURE disminuir_inventario(
    p_idproducto INTEGER,
    p_cantidad INTEGER
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_cantidad_actual INTEGER;
BEGIN
    -- Verificar que la cantidad a disminuir sea positiva
    IF p_cantidad <= 0 THEN
        RAISE EXCEPTION 'La cantidad a disminuir debe ser un número positivo';
    END IF;

    -- Obtener la cantidad actual
    SELECT cantidad INTO v_cantidad_actual
    FROM inventario
    WHERE idproducto = p_idproducto;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Producto con ID % no encontrado en el inventario', p_idproducto;
    END IF;

    -- Verificar si hay suficiente inventario para restar
    IF v_cantidad_actual < p_cantidad THEN
        RAISE EXCEPTION 'No hay suficiente inventario. Cantidad actual: %, Cantidad a disminuir: %', v_cantidad_actual, p_cantidad;
    END IF;

    -- Actualizar el inventario
    UPDATE inventario
    SET cantidad = cantidad - p_cantidad
    WHERE idproducto = p_idproducto;

    -- Confirmar la actualización
    RAISE NOTICE 'Inventario actualizado. Nuevo valor para producto %: %', p_producto_id, (v_cantidad_actual - p_cantidad);
END;
$$;





