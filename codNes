    Sub GrabarEnBD(ByVal pds As DataSet, ByVal pTipo As String)
        Dim dsReceta As Data.DataSet
        Dim dsDroga As Data.DataSet
        Dim transaction As SqlTransaction
        Dim strStreamWriter As StreamWriter
        Dim n As Integer, i As Integer

        Dim s_idRecetaFLV As Integer
        Dim s_idConvenioFLV As Integer
        Dim s_idEstado As Integer
        Dim s_Estado As String
        Dim s_idRechazo As Integer
        Dim s_idDrogueria As Integer
        Dim s_Drogueria As String
        Dim s_FechaCAMOyTE As Date
        Dim FecCamoyte As String
        Dim s_FechaComunicacionDrogueria As Date
        Dim FecDrogueria As String
        Dim s_Remito As String
        Dim s_FechaRemito As Date
        Dim FecRemito As String
        Dim s_CodAp As String
        Dim s_RegID As String
        Dim s_Error As String
        Dim s_IdMedicamento As Integer
        Dim s_Cantidad As Integer
        Dim intAcontecimientoFLV As Integer
        Dim s_CodObs As Integer
        Dim s_Obs As String
        Dim s_Receta As String
        Dim s_Nota As String
        Dim intConvenio As Integer
        Dim s_Sistema As Integer
        Dim s_XML As String
        Dim posFechaNota As Integer
        Dim stxt As String

        n = 0
        i = 0
        s_Receta = ""
        s_Sistema = 0

        Try
            s_XML = pds.GetXml
            s_idRecetaFLV = pds.Tables(0).Rows(0).Item("idRecetaFLV")
            s_idConvenioFLV = IIf(IsDBNull(pds.Tables(0).Rows(0).Item("idConvenioFLV")), 0, pds.Tables(0).Rows(0).Item("idConvenioFLV"))
            s_idEstado = pds.Tables(0).Rows(0).Item("idEstado")
            s_Estado = IIf(IsDBNull(pds.Tables(0).Rows(0).Item("Estado")), "", pds.Tables(0).Rows(0).Item("Estado"))
            s_idRechazo = IIf(IsDBNull(pds.Tables(0).Rows(0).Item("idRechazo")), 0, pds.Tables(0).Rows(0).Item("idRechazo"))
            s_idDrogueria = IIf(IsDBNull(pds.Tables(0).Rows(0).Item("idDrogueria")), 0, pds.Tables(0).Rows(0).Item("idDrogueria"))
            
            If s_idDrogueria <> 0 Then
                s_Drogueria = GetDrogueria(s_idDrogueria)
            Else
                s_Drogueria = ""
            End If

            s_FechaCAMOyTE = IIf(IsDBNull(pds.Tables(0).Rows(0).Item("FechaCAMOyTE")), Now(), pds.Tables(0).Rows(0).Item("FechaCAMOyTE"))
            FecCamoyte = "CONVERT(DATETIME, '" & s_FechaCAMOyTE.Year & "-" & s_FechaCAMOyTE.Month & "-" & s_FechaCAMOyTE.Day & " 00:00:00', 102)"
            s_FechaComunicacionDrogueria = IIf(IsDBNull(pds.Tables(0).Rows(0).Item("FechaComunicacionDrogueria")), Now(), pds.Tables(0).Rows(0).Item("FechaComunicacionDrogueria"))
            FecDrogueria = "CONVERT(DATETIME, '" & s_FechaComunicacionDrogueria.Year & "-" & s_FechaComunicacionDrogueria.Month & "-" & s_FechaComunicacionDrogueria.Day & " 00:00:00', 102)"
            s_Remito = IIf(IsDBNull(pds.Tables(0).Rows(0).Item("Remito")), "", pds.Tables(0).Rows(0).Item("Remito"))
            s_FechaRemito = IIf(IsDBNull(pds.Tables(0).Rows(0).Item("FechaRemito")), Now(), pds.Tables(0).Rows(0).Item("FechaRemito"))
            FecRemito = "CONVERT(DATETIME, '" & s_FechaRemito.Year & "-" & s_FechaRemito.Month & "-" & s_FechaRemito.Day & " 00:00:00', 102)"
            s_CodAp = IIf(IsDBNull(pds.Tables(0).Rows(0).Item("CodAp")), "", pds.Tables(0).Rows(0).Item("CodAp"))
            s_RegID = pds.Tables(0).Rows(0).Item("RegID").ToString
            If pds.Tables(3).Rows.Count > 0 Then
                s_Error = pds.Tables(3).Rows(0).Item("Error")
            Else
                s_Error = ""
            End If
            If pds.Tables(2).Rows.Count > 0 Then
                s_CodObs = pds.Tables(2).Rows(0).Item("idObservacion")
                s_Obs = pds.Tables(2).Rows(0).Item("DescObservacion")
            Else
                s_CodObs = 0
                s_Obs = ""
            End If
            If pds.Tables(1).Rows.Count > 0 Then
                s_Nota = ""
                For i = 0 To pds.Tables(1).Rows.Count - 1
                    s_Nota = s_Nota & IIf(Len(Trim(s_Nota)) = 0, "", ", ") & IIf(IsDBNull(pds.Tables(1).Rows(i).Item("NOTA")), "", Replace(pds.Tables(1).Rows(i).Item("NOTA"), "'", "''"))
                Next i
                's_Nota = IIf(IsDBNull(pds.Tables(1).Rows(0).Item("NOTA")), "", pds.Tables(1).Rows(0).Item("NOTA"))
            Else
                s_Nota = ""
            End If
            'Devuelve un DataSet con la Receta
            dsReceta = GetReceta(s_idRecetaFLV)
            s_Receta = dsReceta.Tables(0).Rows(0).Item("NroReceta")
            'Recupero el codigo de estado FLV correspondiente al estado de ACES
            intAcontecimientoFLV = GetEstadoFLV(s_idEstado)
            'Recupero el Convenio de la Receta
            intConvenio = GetConvenio(s_idRecetaFLV)
            'MsgBox(s_RegID)
            'MsgBox(IIf(IsDBNull(dsReceta.Tables(0).Rows(0).Item("RegID")), "xxx", dsReceta.Tables(0).Rows(0).Item("RegID")))
            If s_RegID = IIf(IsDBNull(dsReceta.Tables(0).Rows(0).Item("RegID")), "xxx", dsReceta.Tables(0).Rows(0).Item("RegID")) Then
                'MsgBox("GUID Igual")
                strStreamWriter = File.AppendText(FilePathLOG)
                strStreamWriter.WriteLine("ID = " & s_idRecetaFLV & " - RECETA = " & s_Receta & " - GUID EXISTENTE (NO SE PROCESA)")
                strStreamWriter.Close()
                'If s_idEstado <> 13 Then
                '    'MsgBox("No es 13")
            Else
                'MsgBox("GUID distinto")
                Select Case s_idEstado
                    '1 - Validada - Pendiente aprobación administrativa (Buzón)
                    Case 1
                        Using connection As New SqlConnection("Data Source=camoytes52; User ID=te; Password=C4m0yT3Q~20;Initial Catalog=Farma;")
                            Try
                                connection.Open()
                                Dim command As SqlCommand = connection.CreateCommand()
                                ' comenzar una transaction
                                transaction = connection.BeginTransaction("EjemploTransaction")
                                command.Connection = connection
                                command.Transaction = transaction
                                'Actualizo los Acontecimientos de la receta y el RegID
                                command.CommandText = _
                                 "UPDATE  Recetas SET RegID = '" & s_RegID & "', WS_validada = 1 " _
                                & "WHERE (IDReceta = '" & s_idRecetaFLV & "')"
                                command.ExecuteNonQuery()
                                'Agrego Evento
                                command.CommandText = _
                                 "INSERT INTO EventosReceta (idReceta, nroreceta, idFarmacia, FechaEvento, FechaAcontecimiento, Estado, Orden, Usuario, DescAcontecimiento, Observaciones, Observaciones1, Sistema, RegID) " _
                                & "VALUES (" & s_idRecetaFLV & ",'" & dsReceta.Tables(0).Rows(0).Item("NroReceta") & "', '" & dsReceta.Tables(0).Rows(0).Item("idFarmacia") & "', getdate(), " & FecCamoyte & ", " & intAcontecimientoFLV & ", 0, 0, '" & s_Estado & "', '', '', 1, '" & s_RegID & "')"
                                command.ExecuteNonQuery()
                                'Intento finalizar la transaction.
                                transaction.Commit()
                            Catch ex As Exception
                                'Intento cancelar la transaction.
                                Try
                                    transaction.Rollback()
                                    strStreamWriter = File.AppendText(FilePathError)
                                    strStreamWriter.WriteLine(ex.Message & "(ID=" & s_idRecetaFLV & ")")
                                    strStreamWriter.Close()
                                Catch ex2 As Exception
                                    'En el caso de que no se pueda hacer Rollback.
                                    strStreamWriter = File.AppendText(FilePathError)
                                    strStreamWriter.WriteLine(ex2.Message & "(ID=" & s_idRecetaFLV & ")")
                                    strStreamWriter.Close()
                                End Try
                            End Try
                        End Using
                    Case 2 'Validada con error
                        Using connection As New SqlConnection("Data Source=camoytes52; User ID=te; Password=C4m0yT3Q~20;Initial Catalog=Farma;")
                            Try
                                connection.Open()
                                Dim command As SqlCommand = connection.CreateCommand()
                                ' comenzar una transaction
                                transaction = connection.BeginTransaction("EjemploTransaction")
                                command.Connection = connection
                                command.Transaction = transaction
                                If s_Error = "Trámite previamente iniciado por Fax. Debe terminarse por misma vía." Then
                                    'Actualizo los Acontecimientos de la receta y el RegID
                                    command.CommandText = _
                                     "UPDATE  Recetas SET Estado = 7, FechaComunicacion = " & FecCamoyte & ", RegID = '" & s_RegID & "', WS_validada = 9 " _
                                   & "WHERE (IDReceta = '" & s_idRecetaFLV & "')"
                                    command.ExecuteNonQuery()
                                Else
                                    'Actualizo los Acontecimientos de la receta y el RegID
                                    command.CommandText = _
                                     "UPDATE  Recetas SET RegID = '" & s_RegID & "', WS_validada = 9 " _
                                   & "WHERE (IDReceta = '" & s_idRecetaFLV & "')"
                                    command.ExecuteNonQuery()
                                End If
                                'Agrego Evento
                                command.CommandText = _
                                 "INSERT INTO EventosReceta (idReceta, nroreceta, idFarmacia, FechaEvento, FechaAcontecimiento, Estado, Orden, Usuario, DescAcontecimiento, Observaciones, Observaciones1, Sistema, RegID) " _
                                & "VALUES (" & s_idRecetaFLV & ",'" & dsReceta.Tables(0).Rows(0).Item("NroReceta") & "', '" & dsReceta.Tables(0).Rows(0).Item("idFarmacia") & "', getdate(), " & FecCamoyte & ", " & intAcontecimientoFLV & ", 0, 0, '" & s_Error & "', '', '', 1, '" & s_RegID & "')"
                                command.ExecuteNonQuery()
                                'Intento finalizar la transaction.
                                transaction.Commit()
                            Catch ex As Exception
                                'Intento cancelar la transaction.
                                Try
                                    transaction.Rollback()
                                    strStreamWriter = File.AppendText(FilePathError)
                                    strStreamWriter.WriteLine(ex.Message & "(ID=" & s_idRecetaFLV & ")")
                                    strStreamWriter.Close()
                                Catch ex2 As Exception
                                    'En el caso de que no se pueda hacer Rollback.
                                    strStreamWriter = File.AppendText(FilePathError)
                                    strStreamWriter.WriteLine(ex2.Message & "(ID=" & s_idRecetaFLV & ")")
                                    strStreamWriter.Close()
                                End Try
                            End Try
                        End Using
                    Case 3 'Receta previamente procesada por CAMOYTE
                        Using connection As New SqlConnection("Data Source=camoytes52; User ID=te; Password=C4m0yT3Q~20;Initial Catalog=Farma;")
                            Try
                                connection.Open()
                                Dim command As SqlCommand = connection.CreateCommand()
                                ' comenzar una transaction
                                transaction = connection.BeginTransaction("EjemploTransaction")
                                command.Connection = connection
                                command.Transaction = transaction
                                'Actualizo los Acontecimientos de la receta y el RegID
                                If pTipo = "<POR AHORA NO>" Then
                                    command.CommandText = _
                                         "UPDATE  Recetas SET Estado = " & intAcontecimientoFLV & ", FechaComunicacion = " & FecCamoyte & ", RegID = '" & s_RegID & "' " _
                                        & "WHERE (IDReceta = '" & s_idRecetaFLV & "')"
                                    command.ExecuteNonQuery()
                                Else
                                    If InStr(s_Estado, "Estado: Aprobada") > 0 Then
                                        Dim sFec As String
                                        Dim sFecAux As String
                                        sFec = Mid(s_Estado, InStr(s_Estado, "Fecha:") + 7, 10)
                                        sFecAux = "CONVERT(DATETIME, '" & Mid(sFec, 7, 4) & "-" & Mid(sFec, 4, 2) & "-" & Mid(sFec, 1, 2) & " 00:00:00', 102)"
                                        command.CommandText = _
                                             "UPDATE  Recetas SET Estado = 6, FechaComunicacion = " & sFecAux & ", ultimoEvento = getdate(), RegID = '" & s_RegID & "' " _
                                            & "WHERE (IDReceta = '" & s_idRecetaFLV & "')"
                                        command.ExecuteNonQuery()
                                    Else
                                        command.CommandText = _
                                             "UPDATE  Recetas SET RegID = '" & s_RegID & "' " _
                                            & "WHERE (IDReceta = '" & s_idRecetaFLV & "')"
                                        command.ExecuteNonQuery()
                                    End If
                                End If
                                'Agrego Evento
                                command.CommandText = _
                                 "INSERT INTO EventosReceta (idReceta, nroreceta, idFarmacia, FechaEvento, FechaAcontecimiento, Estado, Orden, Usuario, DescAcontecimiento, Observaciones, Observaciones1, Sistema, RegID) " _
                                & "VALUES (" & s_idRecetaFLV & ",'" & dsReceta.Tables(0).Rows(0).Item("NroReceta") & "', '" & dsReceta.Tables(0).Rows(0).Item("idFarmacia") & "', getdate(), " & FecCamoyte & ", " & intAcontecimientoFLV & ", 0, 0, '" & s_Estado & "', '', '', 1, '" & s_RegID & "')"
                                command.ExecuteNonQuery()
                                'Intento finalizar la transaction.
                                transaction.Commit()
                            Catch ex As Exception
                                'Intento cancelar la transaction.
                                Try
                                    transaction.Rollback()
                                    strStreamWriter = File.AppendText(FilePathError)
                                    strStreamWriter.WriteLine(ex.Message & "(ID=" & s_idRecetaFLV & ")")
                                    strStreamWriter.Close()
                                Catch ex2 As Exception
                                    'En el caso de que no se pueda hacer Rollback.
                                    strStreamWriter = File.AppendText(FilePathError)
                                    strStreamWriter.WriteLine(ex2.Message & "(ID=" & s_idRecetaFLV & ")")
                                    strStreamWriter.Close()
                                End Try
                            End Try
                        End Using
                    Case 4  'Aprobada
                        Using connection As New SqlConnection("Data Source=camoytes52; User ID=te; Password=C4m0yT3Q~20;Initial Catalog=Farma;")
                            Try
                                connection.Open()
                                Dim command As SqlCommand = connection.CreateCommand()
                                ' comenzar una transaction
                                transaction = connection.BeginTransaction("EjemploTransaction")
                                command.Connection = connection
                                command.Transaction = transaction
                                'Actualizo los Acontecimientos de la receta y el RegID
                                If intConvenio = 12 Then
                                    command.CommandText = _
                                     "UPDATE  Recetas SET Estado = " & IIf(s_Remito = "", 9, 13) & ", FechaComunicacion = " & IIf(s_Remito = "", IIf(FecDrogueria = "", FecCamoyte, FecDrogueria), FecRemito) & ", " _
                                    & "Drogueria = " & s_idDrogueria & ", CodAutorizacion = '" & s_CodAp & "', ultimoEvento = getdate(), RegID = '" & s_RegID & "' " _
                                    & "WHERE (IDReceta = '" & s_idRecetaFLV & "')"
                                    command.ExecuteNonQuery()
                                ElseIf intConvenio = 22 Then
                                    command.CommandText = _
                                     "UPDATE  Recetas SET Estado = 41, FechaComunicacion = " & FecCamoyte & ", RegID = '" & s_RegID & "' " _
                                    & "WHERE (IDReceta = '" & s_idRecetaFLV & "')"
                                    command.ExecuteNonQuery()
                                Else
                                    command.CommandText = _
                                     "UPDATE  Recetas SET Estado = " & IIf(s_Remito = "", 6, 13) & ", FechaComunicacion = " & IIf(s_Remito = "", IIf(FecDrogueria = "", FecCamoyte, FecDrogueria), FecRemito) & ", " _
                                    & "Drogueria = " & s_idDrogueria & ", CodAutorizacion = '" & s_CodAp & "', ultimoEvento = getdate(), RegID = '" & s_RegID & "' " _
                                    & "WHERE (IDReceta = '" & s_idRecetaFLV & "')"
                                    command.ExecuteNonQuery()
                                End If
                                'Agrego Evento
                                If pds.Tables(2).Rows.Count > 0 Then
                                    s_Obs = ""
                                    For i = 0 To pds.Tables(2).Rows.Count - 1
                                        s_Obs = s_Obs & IIf(s_Obs = "", "", " - ") & Trim(pds.Tables(2).Rows(i).Item("DescObservacion"))
                                    Next i
                                End If
                                If intConvenio = 22 Then
                                    command.CommandText = _
                                     "INSERT INTO EventosReceta (idreceta, nroreceta, idFarmacia, FechaEvento, FechaAcontecimiento, Estado, Orden, Usuario, DescAcontecimiento, Observaciones, Observaciones1, Sistema, RegID) " _
                                    & "VALUES (" & s_idRecetaFLV & ",'" & dsReceta.Tables(0).Rows(0).Item("NroReceta") & "', '" & dsReceta.Tables(0).Rows(0).Item("idFarmacia") & "', getdate(), " & FecCamoyte & ", 41, 0, 0, '" & s_Estado & "', '', '', 0, '" & s_RegID & "')"
                                    command.ExecuteNonQuery()
                                Else
                                    If intConvenio = 12 Then
                                        intAcontecimientoFLV = 9
                                    End If
                                    '---------------------2 convenios-----------------------------
                                    If InStr(1, s_Nota, "Esta receta se evaluará por 2 convenios distintos.", CompareMethod.Text) > 0 Then
                                        command.CommandText = _
                                         "INSERT INTO EventosReceta (idreceta, nroreceta, idFarmacia, FechaEvento, FechaAcontecimiento, Estado, Orden, Usuario, DescAcontecimiento, Observaciones, Observaciones1, Sistema, RegID) " _
                                        & "VALUES (" & s_idRecetaFLV & ",'" & dsReceta.Tables(0).Rows(0).Item("NroReceta") & "', '" & dsReceta.Tables(0).Rows(0).Item("idFarmacia") & "', getdate(), " & FecCamoyte & ", 72, 0, 0, '', '', '', 0, '" & s_RegID & "')"
                                        command.ExecuteNonQuery()
                                    End If
                                    '--------------------------------------------------
                                    If pTipo <> "A" Then
                                        command.CommandText = _
                                         "INSERT INTO EventosReceta (idreceta, nroreceta, idFarmacia, FechaEvento, FechaAcontecimiento, Estado, Orden, Usuario, DescAcontecimiento, Observaciones, Observaciones1, Sistema, RegID) " _
                                        & "VALUES (" & s_idRecetaFLV & ",'" & dsReceta.Tables(0).Rows(0).Item("NroReceta") & "', '" & dsReceta.Tables(0).Rows(0).Item("idFarmacia") & "', getdate(), " & IIf(FecDrogueria = "", FecCamoyte, FecDrogueria) & ", " & intAcontecimientoFLV & ", 0, 0, 'DROGUERIA ASIGNADA (" & s_idDrogueria & ") " & s_Drogueria & "', 'DROGUERIA ASIGNADA (" & s_idDrogueria & ") " & s_Drogueria & "', '" & Left(Trim(s_Nota) & " - " & s_Obs, 400) & "', 0, '" & s_RegID & "')"
                                        command.ExecuteNonQuery()
                                    End If
                                    If pTipo = "A" Then
                                        command.CommandText = _
                                         "UPDATE EventosReceta SET DescAcontecimiento = 'DROGUERIA ASIGNADA (" & s_idDrogueria & ") " & s_Drogueria & "', Observaciones = 'DROGUERIA ASIGNADA (" & s_idDrogueria & ") " & s_Drogueria & "', FechaAcontecimiento = " & IIf(FecDrogueria = "", FecCamoyte, FecDrogueria) & ", Observaciones1 = '" & Left(Trim(s_Nota) & " - " & s_Obs, 400) & "', RegID = '" & s_RegID & "' " _
                                        & "WHERE (nroreceta = '" & dsReceta.Tables(0).Rows(0).Item("NroReceta") & "') AND (Estado = " & intAcontecimientoFLV & ")"
                                        command.ExecuteNonQuery()
                                    End If
                                    'If s_Remito <> "" Then
                                    '    command.CommandText = _
                                    '     "INSERT INTO EventosReceta (idReceta, nroreceta, idFarmacia, FechaEvento, FechaAcontecimiento, Estado, Orden, Usuario, DescAcontecimiento, Observaciones, Observaciones1, Sistema, RegID) " _
                                    '    & "VALUES (" & s_idRecetaFLV & ",'" & dsReceta.Tables(0).Rows(0).Item("NroReceta") & "', '" & dsReceta.Tables(0).Rows(0).Item("idFarmacia") & "', getdate(), " & FecRemito & ", 13, 0, 0, 'Remito Nro: " & s_Remito & "', 'Remito Nro: " & s_Remito & "', '" & Left(Trim(s_Nota) & " - " & s_Obs, 400) & "', 0, '" & s_RegID & "')"
                                    '    command.ExecuteNonQuery()
                                    'End If
                                End If
                                If pds.Tables(4).Rows.Count > 0 Then
                                    'Borro los medicamentos
                                    command.CommandText = _
                                     "delete ITEMSRECETA where idreceta = " & s_idRecetaFLV
                                    command.ExecuteNonQuery()
                                    n = pds.Tables(4).Rows.Count
                                    For i = 0 To n - 1
                                        's_IdMedicamento = pds.Tables(4).Rows(i).Item("idProducto")
                                        s_IdMedicamento = IIf(IsDBNull(pds.Tables(4).Rows(i).Item("idProducto")), 0, pds.Tables(4).Rows(i).Item("idProducto"))
                                        s_Cantidad = pds.Tables(4).Rows(i).Item("Cantidad")
                                        dsDroga = GetDroga(s_IdMedicamento)
                                        If dsDroga.Tables(0).Rows.Count > 0 Then
                                            command.CommandText = _
                                             "INSERT INTO ITEMSRECETA (idreceta, nroreceta, idmedicamento, idpresentacion, iddroga, cantidad, troquel) " _
                                            & "VALUES (" & s_idRecetaFLV & ", '" & dsReceta.Tables(0).Rows(0).Item("NroReceta") & "'," & dsDroga.Tables(0).Rows(0).Item("idMedicamento") & "," & dsDroga.Tables(0).Rows(0).Item("idPresentacion") & "," & dsDroga.Tables(0).Rows(0).Item("idDroga") & "," & s_Cantidad & ",'" & dsDroga.Tables(0).Rows(0).Item("Troquel") & "')"
                                            command.ExecuteNonQuery()
                                        End If
                                    Next
                                End If
                                'Intento finalizar la transaction.
                                transaction.Commit()
                            Catch ex As Exception
                                'Intento cancelar la transaction.
                                Try
                                    transaction.Rollback()
                                    strStreamWriter = File.AppendText(FilePathError)
                                    strStreamWriter.WriteLine(ex.Message & "(ID=" & s_idRecetaFLV & ")(XML=" & s_XML & ")")
                                    strStreamWriter.Close()
                                Catch ex2 As Exception
                                    'En el caso de que no se pueda hacer Rollback.
                                    strStreamWriter = File.AppendText(FilePathError)
                                    strStreamWriter.WriteLine(ex2.Message & "(ID=" & s_idRecetaFLV & ")(XML=" & s_XML & ")")
                                    strStreamWriter.Close()
                                End Try
                            End Try
                        End Using
                    Case 5  'Observada
                        Using connection As New SqlConnection("Data Source=camoytes52; User ID=te; Password=C4m0yT3Q~20;Initial Catalog=Farma;")
                            Try
                                connection.Open()
                                Dim command As SqlCommand = connection.CreateCommand()
                                ' comenzar una transaction
                                transaction = connection.BeginTransaction("EjemploTransaction")
                                command.Connection = connection
                                command.Transaction = transaction
                                'Actualizo los Acontecimientos de la receta y el RegID
                                If intConvenio = 12 Then
                                    command.CommandText = _
                                     "UPDATE  Recetas SET Estado = 11, FechaComunicacion = CONVERT(DATETIME, '" & s_FechaCAMOyTE.Year & "-" & s_FechaCAMOyTE.Month & "-" & s_FechaCAMOyTE.Day & " 00:00:00', 102), fecharechazo = CONVERT(DATETIME, '" & s_FechaCAMOyTE.Year & "-" & s_FechaCAMOyTE.Month & "-" & s_FechaCAMOyTE.Day & " 00:00:00', 102), " _
                                    & "codrechazo = " & s_idRechazo & ", descripcionrechazo = '" & s_Obs & "', ultimoEvento = getdate(), RegID = '" & s_RegID & "' " _
                                    & "WHERE (IDReceta = '" & s_idRecetaFLV & "')"
                                    command.ExecuteNonQuery()
                                Else
                                    command.CommandText = _
                                     "UPDATE  Recetas SET Estado = 7, FechaComunicacion = CONVERT(DATETIME, '" & s_FechaCAMOyTE.Year & "-" & s_FechaCAMOyTE.Month & "-" & s_FechaCAMOyTE.Day & " 00:00:00', 102), fecharechazo = CONVERT(DATETIME, '" & s_FechaCAMOyTE.Year & "-" & s_FechaCAMOyTE.Month & "-" & s_FechaCAMOyTE.Day & " 00:00:00', 102), " _
                                    & "codrechazo = " & s_CodObs & ", descripcionrechazo = '" & s_Obs & "', ultimoEvento = getdate(), RegID = '" & s_RegID & "' " _
                                    & "WHERE (IDReceta = '" & s_idRecetaFLV & "')"
                                    command.ExecuteNonQuery()
                                End If
                                'Agrego Evento
                                If intConvenio = 12 Then
                                    intAcontecimientoFLV = 11
                                End If
                                '---------------------2 convenios-----------------------------
                                If InStr(1, s_Nota, "Esta receta se evaluará por 2 convenios distintos.", CompareMethod.Text) > 0 Then
                                    command.CommandText = _
                                     "INSERT INTO EventosReceta (idreceta, nroreceta, idFarmacia, FechaEvento, FechaAcontecimiento, Estado, Orden, Usuario, DescAcontecimiento, Observaciones, Observaciones1, Sistema, RegID) " _
                                    & "VALUES (" & s_idRecetaFLV & ",'" & dsReceta.Tables(0).Rows(0).Item("NroReceta") & "', '" & dsReceta.Tables(0).Rows(0).Item("idFarmacia") & "', getdate(), " & FecCamoyte & ", 72, 0, 0, '', '', '', 0, '" & s_RegID & "')"
                                    command.ExecuteNonQuery()
                                End If
                                '--------------------------------------------------
                                If pds.Tables(2).Rows.Count > 0 Then
                                    For i = 0 To pds.Tables(2).Rows.Count - 1
                                        s_CodObs = pds.Tables(2).Rows(i).Item("idObservacion")
                                        s_Obs = pds.Tables(2).Rows(i).Item("DescObservacion")
                                        command.CommandText = _
                                         "INSERT INTO EventosReceta (idReceta, nroreceta, idFarmacia, FechaEvento, FechaAcontecimiento, Estado, Orden, Usuario, DescAcontecimiento, Observaciones, Observaciones1, Sistema, RegID) " _
                                        & "VALUES (" & s_idRecetaFLV & ",'" & dsReceta.Tables(0).Rows(0).Item("NroReceta") & "', '" & dsReceta.Tables(0).Rows(0).Item("idFarmacia") & "', getdate(), " & FecCamoyte & ", " & intAcontecimientoFLV & ", 0, 0, '" & IIf(s_Obs = "", s_Estado, Mid(s_Obs, 1, 200)) & "', '', '', 0, '" & s_RegID & "')"
                                        command.ExecuteNonQuery()
                                    Next i
                                    If pds.Tables(1).Rows.Count > 0 Then
                                        For i = 0 To pds.Tables(1).Rows.Count - 1
                                            s_Obs = s_Nota 'pds.Tables(1).Rows(i).Item("NOTA")
                                            command.CommandText = _
                                             "INSERT INTO EventosReceta (idReceta, nroreceta, idFarmacia, FechaEvento, FechaAcontecimiento, Estado, Orden, Usuario, DescAcontecimiento, Observaciones, Observaciones1, Sistema, RegID) " _
                                            & "VALUES (" & s_idRecetaFLV & ",'" & dsReceta.Tables(0).Rows(0).Item("NroReceta") & "', '" & dsReceta.Tables(0).Rows(0).Item("idFarmacia") & "', getdate(), " & FecCamoyte & ", " & intAcontecimientoFLV & ", 0, 0, '" & IIf(s_Obs = "", s_Estado, Mid(s_Obs, 1, 200)) & "', '" & IIf(s_Obs = "", s_Estado, Mid(s_Obs, 1, 400)) & "', '', 0, '" & s_RegID & "')"
                                            command.ExecuteNonQuery()
                                        Next i
                                    End If
                                Else
                                    If pds.Tables(1).Rows.Count > 0 Then
                                        For i = 0 To pds.Tables(1).Rows.Count - 1
                                            s_Obs = s_Nota 'pds.Tables(1).Rows(i).Item("NOTA")
                                            command.CommandText = _
                                             "INSERT INTO EventosReceta (idReceta, nroreceta, idFarmacia, FechaEvento, FechaAcontecimiento, Estado, Orden, Usuario, DescAcontecimiento, Observaciones, Observaciones1, Sistema, RegID) " _
                                            & "VALUES (" & s_idRecetaFLV & ",'" & dsReceta.Tables(0).Rows(0).Item("NroReceta") & "', '" & dsReceta.Tables(0).Rows(0).Item("idFarmacia") & "', getdate(), " & FecCamoyte & ", " & intAcontecimientoFLV & ", 0, 0, '" & IIf(s_Obs = "", s_Estado, Mid(s_Obs, 1, 200)) & "', '', '', 0, '" & s_RegID & "')"
                                            command.ExecuteNonQuery()
                                        Next i
                                    Else
                                        s_CodObs = 0
                                        s_Obs = ""
                                        command.CommandText = _
                                         "INSERT INTO EventosReceta (idReceta, nroreceta, idFarmacia, FechaEvento, FechaAcontecimiento, Estado, Orden, Usuario, DescAcontecimiento, Observaciones, Observaciones1, Sistema, RegID) " _
                                        & "VALUES (" & s_idRecetaFLV & ",'" & dsReceta.Tables(0).Rows(0).Item("NroReceta") & "', '" & dsReceta.Tables(0).Rows(0).Item("idFarmacia") & "', getdate(), " & FecCamoyte & ", " & intAcontecimientoFLV & ", 0, 0, '" & IIf(s_Obs = "", s_Estado, Mid(s_Obs, 1, 200)) & "', '', '', 0, '" & s_RegID & "')"
                                        command.ExecuteNonQuery()
                                    End If
                                End If
                                'Intento finalizar la transaction.
                                transaction.Commit()
                            Catch ex As Exception
                                'Intento cancelar la transaction.
                                Try
                                    transaction.Rollback()
                                    strStreamWriter = File.AppendText(FilePathError)
                                    strStreamWriter.WriteLine(ex.Message & "(ID=" & s_idRecetaFLV & ")(XML=" & s_XML & ")")
                                    strStreamWriter.Close()
                                Catch ex2 As Exception
                                    'En el caso de que no se pueda hacer Rollback.
                                    strStreamWriter = File.AppendText(FilePathError)
                                    strStreamWriter.WriteLine(ex2.Message & "(ID=" & s_idRecetaFLV & ")(XML=" & s_XML & ")")
                                    strStreamWriter.Close()
                                End Try
                            End Try
                        End Using
                    Case 10 'Trámite inexistente
                        Using connection As New SqlConnection("Data Source=camoytes52; User ID=te; Password=C4m0yT3Q~20;Initial Catalog=Farma;")
                            Try
                                connection.Open()
                                Dim command As SqlCommand = connection.CreateCommand()
                                ' comenzar una transaction
                                transaction = connection.BeginTransaction("EjemploTransaction")
                                command.Connection = connection
                                command.Transaction = transaction
                                'Actualizo los Acontecimientos de la receta y el RegID
                                command.CommandText = _
                                 "UPDATE  Recetas SET WS_Estado = 0, Reingreso = 0 , RegID = '" & s_RegID & "' " _
                                & "WHERE (IDReceta = '" & s_idRecetaFLV & "')"
                                command.ExecuteNonQuery()
                                'Agrego Evento
                                command.CommandText = _
                                 "INSERT INTO EventosReceta (idReceta, nroreceta, idFarmacia, FechaEvento, FechaAcontecimiento, Estado, Orden, Usuario, DescAcontecimiento, Observaciones, Observaciones1, Sistema, RegID) " _
                                & "VALUES (" & s_idRecetaFLV & ",'" & dsReceta.Tables(0).Rows(0).Item("NroReceta") & "', '" & dsReceta.Tables(0).Rows(0).Item("idFarmacia") & "', getdate(), " & FecCamoyte & ", " & intAcontecimientoFLV & ", 0, 0, '" & s_Estado & "', '', '', 1, '" & s_RegID & "')"
                                command.ExecuteNonQuery()
                                'Intento finalizar la transaction.
                                transaction.Commit()
                            Catch ex As Exception
                                'Intento cancelar la transaction.
                                Try
                                    transaction.Rollback()
                                    strStreamWriter = File.AppendText(FilePathError)
                                    strStreamWriter.WriteLine(ex.Message & "(ID=" & s_idRecetaFLV & ")")
                                    strStreamWriter.Close()
                                Catch ex2 As Exception
                                    'En el caso de que no se pueda hacer Rollback.
                                    strStreamWriter = File.AppendText(FilePathError)
                                    strStreamWriter.WriteLine(ex2.Message & "(ID=" & s_idRecetaFLV & ")")
                                    strStreamWriter.Close()
                                End Try
                            End Try
                        End Using
                    Case 11 'Trámite pendiente de validación
                        Using connection As New SqlConnection("Data Source=camoytes52; User ID=te; Password=C4m0yT3Q~20;Initial Catalog=Farma;")
                            Try
                                connection.Open()
                                Dim command As SqlCommand = connection.CreateCommand()
                                ' comenzar una transaction
                                transaction = connection.BeginTransaction("EjemploTransaction")
                                command.Connection = connection
                                command.Transaction = transaction
                                'Actualizo los Acontecimientos de la receta y el RegID
                                command.CommandText = _
                                 "UPDATE  Recetas SET RegID = '" & s_RegID & "' " _
                                & "WHERE (IDReceta = '" & s_idRecetaFLV & "')"
                                command.ExecuteNonQuery()
                                'Agrego Evento
                                command.CommandText = _
                                 "INSERT INTO EventosReceta (idReceta, nroreceta, idFarmacia, FechaEvento, FechaAcontecimiento, Estado, Orden, Usuario, DescAcontecimiento, Observaciones, Observaciones1, Sistema, RegID) " _
                                & "VALUES (" & s_idRecetaFLV & ",'" & dsReceta.Tables(0).Rows(0).Item("NroReceta") & "', '" & dsReceta.Tables(0).Rows(0).Item("idFarmacia") & "', getdate(), " & FecCamoyte & ", " & intAcontecimientoFLV & ", 0, 0, '" & s_Estado & "', '', '', 1, '" & s_RegID & "')"
                                command.ExecuteNonQuery()
                                'Intento finalizar la transaction.
                                transaction.Commit()
                            Catch ex As Exception
                                'Intento cancelar la transaction.
                                Try
                                    transaction.Rollback()
                                    strStreamWriter = File.AppendText(FilePathError)
                                    strStreamWriter.WriteLine(ex.Message & "(ID=" & s_idRecetaFLV & ")")
                                    strStreamWriter.Close()
                                Catch ex2 As Exception
                                    'En el caso de que no se pueda hacer Rollback.
                                    strStreamWriter = File.AppendText(FilePathError)
                                    strStreamWriter.WriteLine(ex2.Message & "(ID=" & s_idRecetaFLV & ")")
                                    strStreamWriter.Close()
                                End Try
                            End Try
                        End Using
                    Case 12 'Receta anulada
                        Using connection As New SqlConnection("Data Source=camoytes52; User ID=te; Password=C4m0yT3Q~20;Initial Catalog=Farma;")
                            Try
                                connection.Open()
                                Dim command As SqlCommand = connection.CreateCommand()
                                ' comenzar una transaction
                                transaction = connection.BeginTransaction("EjemploTransaction")
                                command.Connection = connection
                                command.Transaction = transaction
                                'Actualizo los Acontecimientos de la receta y el RegID
                                command.CommandText = _
                                 "UPDATE  Recetas SET Estado = " & intAcontecimientoFLV & ", FechaComunicacion = " & FecCamoyte & ", RegID = '" & s_RegID & "' " _
                                & "WHERE (IDReceta = '" & s_idRecetaFLV & "')"
                                command.ExecuteNonQuery()
                                'Agrego Evento
                                command.CommandText = _
                                 "INSERT INTO EventosReceta (idReceta, nroreceta, idFarmacia, FechaEvento, FechaAcontecimiento, Estado, Orden, Usuario, DescAcontecimiento, Observaciones, Observaciones1, Sistema, RegID) " _
                                & "VALUES (" & s_idRecetaFLV & ",'" & dsReceta.Tables(0).Rows(0).Item("NroReceta") & "', '" & dsReceta.Tables(0).Rows(0).Item("idFarmacia") & "', getdate(), " & FecCamoyte & ", " & intAcontecimientoFLV & ", 0, 0, '" & s_Estado & "', '', '', 0, '" & s_RegID & "')"
                                command.ExecuteNonQuery()
                                'Intento finalizar la transaction.
                                transaction.Commit()
                            Catch ex As Exception
                                'Intento cancelar la transaction.
                                Try
                                    transaction.Rollback()
                                    strStreamWriter = File.AppendText(FilePathError)
                                    strStreamWriter.WriteLine(ex.Message & "(ID=" & s_idRecetaFLV & ")")
                                    strStreamWriter.Close()
                                Catch ex2 As Exception
                                    'En el caso de que no se pueda hacer Rollback.
                                    strStreamWriter = File.AppendText(FilePathError)
                                    strStreamWriter.WriteLine(ex2.Message & "(ID=" & s_idRecetaFLV & ")")
                                    strStreamWriter.Close()
                                End Try
                            End Try
                        End Using
                    Case 13 'Aprobada administrativamente
                        'MessageBox.Show("13 - Aprobada administrativamente", "Mensaje")
                        Using connection As New SqlConnection("Data Source=camoytes52; User ID=te; Password=C4m0yT3Q~20;Initial Catalog=Farma;")
                            Try
                                connection.Open()
                                Dim command As SqlCommand = connection.CreateCommand()
                                ' comenzar una transaction
                                transaction = connection.BeginTransaction("EjemploTransaction")
                                command.Connection = connection
                                command.Transaction = transaction
                                'Actualizo los Acontecimientos de la receta y el RegID
                                If intConvenio = 22 Then
                                    command.CommandText = _
                                     "UPDATE  Recetas SET Estado = 41, FechaComunicacion = " & FecCamoyte & ", RegID = '" & s_RegID & "' " _
                                    & "WHERE (IDReceta = '" & s_idRecetaFLV & "')"
                                    command.ExecuteNonQuery()
                                Else
                                    If InStr(1, s_Nota, "Esta receta se evaluará por 2 convenios distintos.", CompareMethod.Text) > 0 Then
                                        command.CommandText = _
                                         "UPDATE  Recetas SET Estado = 72, FechaComunicacion = " & FecCamoyte & ", RegID = '" & s_RegID & "' " _
                                        & "WHERE (IDReceta = '" & s_idRecetaFLV & "')"
                                        command.ExecuteNonQuery()
                                    Else
                                        command.CommandText = _
                                         "UPDATE  Recetas SET RegID = '" & s_RegID & "' " _
                                        & "WHERE (IDReceta = '" & s_idRecetaFLV & "')"
                                        command.ExecuteNonQuery()
                                    End If
                                End If
                                'Agrego Evento
                                If intConvenio = 22 Then
                                    command.CommandText = _
                                     "INSERT INTO EventosReceta (idreceta, nroreceta, idFarmacia, FechaEvento, FechaAcontecimiento, Estado, Orden, Usuario, DescAcontecimiento, Observaciones, Observaciones1, Sistema, RegID) " _
                                    & "VALUES (" & s_idRecetaFLV & ",'" & dsReceta.Tables(0).Rows(0).Item("NroReceta") & "', '" & dsReceta.Tables(0).Rows(0).Item("idFarmacia") & "', getdate(), " & FecCamoyte & ", 41, 0, 0, '" & s_Estado & "', '', '', 0, '" & s_RegID & "')"
                                    command.ExecuteNonQuery()
                                Else
                                    If s_Nota = "Falta providencia escaneada por PAMI nivel central" Or Mid(s_Nota, 1, 1) = "%" Then
                                        s_Sistema = 0
                                    Else
                                        s_Sistema = 0
                                    End If
                                    '--------------------------------------------------
                                    ' BUSCO UNA FECHA EN EL STRING NOTA
                                    '--------------------------------------------------
                                    stxt = "Fecha"
                                    posFechaNota = InStr(1, s_Nota, stxt, CompareMethod.Text)

                                    If posFechaNota > 0 Then
                                        s_Nota = Mid(s_Nota, posFechaNota, Len(s_Nota))
                                        s_Nota = Replace(s_Nota, ":", " estimada de autorización ")
                                        'MessageBox.Show(s_Nota, "Mensaje")
                                    Else
                                        'MessageBox.Show("posFechaNota=0", "Mensaje")

                                    End If
                                    '------------------------2 convenios--------------------------
                                    If InStr(1, s_Nota, "Esta receta se evaluará por 2 convenios distintos.", CompareMethod.Text) > 0 Then
                                        command.CommandText = _
                                         "INSERT INTO EventosReceta (idreceta, nroreceta, idFarmacia, FechaEvento, FechaAcontecimiento, Estado, Orden, Usuario, DescAcontecimiento, Observaciones, Observaciones1, Sistema, RegID) " _
                                        & "VALUES (" & s_idRecetaFLV & ",'" & dsReceta.Tables(0).Rows(0).Item("NroReceta") & "', '" & dsReceta.Tables(0).Rows(0).Item("idFarmacia") & "', getdate(), " & FecCamoyte & ", 72, 0, 0, '', '', '', 0, '" & s_RegID & "')"
                                        command.ExecuteNonQuery()
                                    End If
                                    '--------------------------------------------------
                                    command.CommandText = _
                                     "INSERT INTO EventosReceta (idreceta, nroreceta, idFarmacia, FechaEvento, FechaAcontecimiento, Estado, Orden, Usuario, DescAcontecimiento, Observaciones, Observaciones1, Sistema, RegID) " _
                                    & "VALUES (" & s_idRecetaFLV & ",'" & dsReceta.Tables(0).Rows(0).Item("NroReceta") & "', '" & dsReceta.Tables(0).Rows(0).Item("idFarmacia") & "', getdate(), " & FecCamoyte & ", " & intAcontecimientoFLV & ", 0, 0, '" & s_Estado & "', '" & s_Nota & "', '', " & s_Sistema & ", '" & s_RegID & "')"
                                    command.ExecuteNonQuery()
                                End If
                                'Intento finalizar la transaction.
                                transaction.Commit()
                            Catch ex As Exception
                                'Intento cancelar la transaction.
                                Try
                                    transaction.Rollback()
                                    strStreamWriter = File.AppendText(FilePathError)
                                    strStreamWriter.WriteLine(ex.Message & "(ID=" & s_idRecetaFLV & ")")
                                    strStreamWriter.Close()
                                Catch ex2 As Exception
                                    'En el caso de que no se pueda hacer Rollback.
                                    strStreamWriter = File.AppendText(FilePathError)
                                    strStreamWriter.WriteLine(ex2.Message & "(ID=" & s_idRecetaFLV & ")")
                                    strStreamWriter.Close()
                                End Try
                            End Try
                        End Using
                    Case 14 'En Tramite verificando documentacion afiliado
                        Using connection As New SqlConnection("Data Source=camoytes52; User ID=te; Password=C4m0yT3Q~20;Initial Catalog=Farma;")
                            Try
                                connection.Open()
                                Dim command As SqlCommand = connection.CreateCommand()
                                ' comenzar una transaction
                                transaction = connection.BeginTransaction("EjemploTransaction")
                                command.Connection = connection
                                command.Transaction = transaction
                                'Actualizo los Acontecimientos de la receta y el RegID
                                If pTipo = "P" Then
                                    command.CommandText = _
                                     "UPDATE  Recetas SET Estado = " & intAcontecimientoFLV & ", FechaComunicacion = " & FecCamoyte & ", RegID = '" & s_RegID & "' " _
                                    & "WHERE (IDReceta = '" & s_idRecetaFLV & "')"
                                    command.ExecuteNonQuery()
                                Else
                                    command.CommandText = _
                                     "UPDATE  Recetas SET RegID = '" & s_RegID & "' " _
                                    & "WHERE (IDReceta = '" & s_idRecetaFLV & "')"
                                    command.ExecuteNonQuery()
                                End If
                                'Agrego Evento
                                command.CommandText = _
                                 "INSERT INTO EventosReceta (idReceta, nroreceta, idFarmacia, FechaEvento, FechaAcontecimiento, Estado, Orden, Usuario, DescAcontecimiento, Observaciones, Observaciones1, Sistema, RegID) " _
                                & "VALUES (" & s_idRecetaFLV & ",'" & dsReceta.Tables(0).Rows(0).Item("NroReceta") & "', '" & dsReceta.Tables(0).Rows(0).Item("idFarmacia") & "', getdate(), " & FecCamoyte & ", " & intAcontecimientoFLV & ", 0, 0, '" & s_Estado & "', '', '', 0, '" & s_RegID & "')"
                                command.ExecuteNonQuery()
                                'Intento finalizar la transaction.
                                transaction.Commit()
                            Catch ex As Exception
                                'Intento cancelar la transaction.
                                Try
                                    transaction.Rollback()
                                    strStreamWriter = File.AppendText(FilePathError)
                                    strStreamWriter.WriteLine(ex.Message & "(ID=" & s_idRecetaFLV & ")")
                                    strStreamWriter.Close()
                                Catch ex2 As Exception
                                    'En el caso de que no se pueda hacer Rollback.
                                    strStreamWriter = File.AppendText(FilePathError)
                                    strStreamWriter.WriteLine(ex2.Message & "(ID=" & s_idRecetaFLV & ")")
                                    strStreamWriter.Close()
                                End Try
                            End Try
                        End Using
                    Case 15 'En Tramite APROSS
                        Using connection As New SqlConnection("Data Source=camoytes52; User ID=te; Password=C4m0yT3Q~20;Initial Catalog=Farma;")
                            Try
                                connection.Open()
                                Dim command As SqlCommand = connection.CreateCommand()
                                ' comenzar una transaction
                                transaction = connection.BeginTransaction("EjemploTransaction")
                                command.Connection = connection
                                command.Transaction = transaction
                                'Actualizo los Acontecimientos de la receta y el RegID
                                command.CommandText = _
                                 "UPDATE  Recetas SET Estado = " & intAcontecimientoFLV & ", FechaComunicacion = " & FecCamoyte & ", RegID = '" & s_RegID & "' " _
                                & "WHERE (IDReceta = '" & s_idRecetaFLV & "')"
                                command.ExecuteNonQuery()
                                'Agrego Evento
                                command.CommandText = _
                                 "INSERT INTO EventosReceta (idReceta, nroreceta, idFarmacia, FechaEvento, FechaAcontecimiento, Estado, Orden, Usuario, DescAcontecimiento, Observaciones, Observaciones1, Sistema, RegID) " _
                                & "VALUES (" & s_idRecetaFLV & ",'" & dsReceta.Tables(0).Rows(0).Item("NroReceta") & "', '" & dsReceta.Tables(0).Rows(0).Item("idFarmacia") & "', getdate(), " & FecCamoyte & ", " & intAcontecimientoFLV & ", 0, 0, '" & s_Estado & "', '', '', 0, '" & s_RegID & "')"
                                command.ExecuteNonQuery()
                                'Intento finalizar la transaction.
                                transaction.Commit()
                            Catch ex As Exception
                                'Intento cancelar la transaction.
                                Try
                                    transaction.Rollback()
                                    strStreamWriter = File.AppendText(FilePathError)
                                    strStreamWriter.WriteLine(ex.Message & "(ID=" & s_idRecetaFLV & ")")
                                    strStreamWriter.Close()
                                Catch ex2 As Exception
                                    'En el caso de que no se pueda hacer Rollback.
                                    strStreamWriter = File.AppendText(FilePathError)
                                    strStreamWriter.WriteLine(ex2.Message & "(ID=" & s_idRecetaFLV & ")")
                                    strStreamWriter.Close()
                                End Try
                            End Try
                        End Using
                    Case 18 'Observada - Se requiere aut. previa por el Instituto mediante envío de expediente por vía de excepción, acercarse a la deleg. PAMI a tramitarlo, por RP solicitado discont., debe modificar o realizar nueva receta
                        Using connection As New SqlConnection("Data Source=camoytes52; User ID=te; Password=C4m0yT3Q~20;Initial Catalog=Farma;")
                            Try
                                connection.Open()
                                Dim command As SqlCommand = connection.CreateCommand()
                                ' comenzar una transaction
                                transaction = connection.BeginTransaction("EjemploTransaction")
                                command.Connection = connection
                                command.Transaction = transaction
                                'Actualizo los Acontecimientos de la receta y el RegID
                                If intConvenio = 12 Then
                                    command.CommandText = _
                                     "UPDATE  Recetas SET Estado = 18, FechaComunicacion = CONVERT(DATETIME, '" & s_FechaCAMOyTE.Year & "-" & s_FechaCAMOyTE.Month & "-" & s_FechaCAMOyTE.Day & " 00:00:00', 102), fecharechazo = CONVERT(DATETIME, '" & s_FechaCAMOyTE.Year & "-" & s_FechaCAMOyTE.Month & "-" & s_FechaCAMOyTE.Day & " 00:00:00', 102), " _
                                    & "codrechazo = " & s_idRechazo & ", descripcionrechazo = '" & s_Obs & "', ultimoEvento = getdate(), RegID = '" & s_RegID & "' " _
                                    & "WHERE (IDReceta = '" & s_idRecetaFLV & "')"
                                    command.ExecuteNonQuery()
                                Else
                                    command.CommandText = _
                                     "UPDATE  Recetas SET Estado = 18, FechaComunicacion = CONVERT(DATETIME, '" & s_FechaCAMOyTE.Year & "-" & s_FechaCAMOyTE.Month & "-" & s_FechaCAMOyTE.Day & " 00:00:00', 102), fecharechazo = CONVERT(DATETIME, '" & s_FechaCAMOyTE.Year & "-" & s_FechaCAMOyTE.Month & "-" & s_FechaCAMOyTE.Day & " 00:00:00', 102), " _
                                    & "codrechazo = " & s_CodObs & ", descripcionrechazo = '" & s_Obs & "', ultimoEvento = getdate(), RegID = '" & s_RegID & "' " _
                                    & "WHERE (IDReceta = '" & s_idRecetaFLV & "')"
                                    command.ExecuteNonQuery()
                                End If
                                'Agrego Evento
                                If intConvenio = 12 Then
                                    intAcontecimientoFLV = 18
                                End If
                                If pds.Tables(2).Rows.Count > 0 Then
                                    For i = 0 To pds.Tables(2).Rows.Count - 1
                                        s_CodObs = pds.Tables(2).Rows(i).Item("idObservacion")
                                        s_Obs = pds.Tables(2).Rows(i).Item("DescObservacion")
                                        command.CommandText = _
                                         "INSERT INTO EventosReceta (idReceta, nroreceta, idFarmacia, FechaEvento, FechaAcontecimiento, Estado, Orden, Usuario, DescAcontecimiento, Observaciones, Observaciones1, Sistema, RegID) " _
                                        & "VALUES (" & s_idRecetaFLV & ",'" & dsReceta.Tables(0).Rows(0).Item("NroReceta") & "', '" & dsReceta.Tables(0).Rows(0).Item("idFarmacia") & "', getdate(), " & FecCamoyte & ", " & intAcontecimientoFLV & ", 0, 0, '" & IIf(s_Obs = "", s_Estado, Mid(s_Obs, 1, 200)) & "', '" & "La Receta no se reingresa. " & s_Estado & "', '', 0, '" & s_RegID & "')"
                                        command.ExecuteNonQuery()
                                    Next i
                                    If pds.Tables(1).Rows.Count > 0 Then
                                        For i = 0 To pds.Tables(1).Rows.Count - 1
                                            s_Obs = s_Nota 'pds.Tables(1).Rows(i).Item("NOTA")
                                            s_Obs = ""
                                            command.CommandText = _
                                             "INSERT INTO EventosReceta (idReceta, nroreceta, idFarmacia, FechaEvento, FechaAcontecimiento, Estado, Orden, Usuario, DescAcontecimiento, Observaciones, Observaciones1, Sistema, RegID) " _
                                            & "VALUES (" & s_idRecetaFLV & ",'" & dsReceta.Tables(0).Rows(0).Item("NroReceta") & "', '" & dsReceta.Tables(0).Rows(0).Item("idFarmacia") & "', getdate(), " & FecCamoyte & ", " & intAcontecimientoFLV & ", 0, 0, '" & IIf(s_Obs = "", s_Estado, Mid(s_Obs, 1, 200)) & "', '" & IIf(s_Obs = "", "La Receta no se reingresa. " & s_Estado, Mid(s_Obs, 1, 400)) & "', '', 0, '" & s_RegID & "')"
                                            command.ExecuteNonQuery()
                                        Next i
                                    End If
                                Else
                                    If pds.Tables(1).Rows.Count > 0 Then
                                        For i = 0 To pds.Tables(1).Rows.Count - 1
                                            s_Obs = s_Nota 'pds.Tables(1).Rows(i).Item("NOTA")
                                            s_Obs = ""
                                            command.CommandText = _
                                             "INSERT INTO EventosReceta (idReceta, nroreceta, idFarmacia, FechaEvento, FechaAcontecimiento, Estado, Orden, Usuario, DescAcontecimiento, Observaciones, Observaciones1, Sistema, RegID) " _
                                            & "VALUES (" & s_idRecetaFLV & ",'" & dsReceta.Tables(0).Rows(0).Item("NroReceta") & "', '" & dsReceta.Tables(0).Rows(0).Item("idFarmacia") & "', getdate(), " & FecCamoyte & ", " & intAcontecimientoFLV & ", 0, 0, '" & IIf(s_Obs = "", s_Estado, Mid(s_Obs, 1, 200)) & "', '" & "La Receta no se reingresa. " & s_Estado & "', '', 0, '" & s_RegID & "')"
                                            command.ExecuteNonQuery()
                                        Next i
                                    Else
                                        s_CodObs = 0
                                        s_Obs = ""
                                        command.CommandText = _
                                         "INSERT INTO EventosReceta (idReceta, nroreceta, idFarmacia, FechaEvento, FechaAcontecimiento, Estado, Orden, Usuario, DescAcontecimiento, Observaciones, Observaciones1, Sistema, RegID) " _
                                        & "VALUES (" & s_idRecetaFLV & ",'" & dsReceta.Tables(0).Rows(0).Item("NroReceta") & "', '" & dsReceta.Tables(0).Rows(0).Item("idFarmacia") & "', getdate(), " & FecCamoyte & ", " & intAcontecimientoFLV & ", 0, 0, '" & IIf(s_Obs = "", s_Estado, Mid(s_Obs, 1, 200)) & "', '" & "La Receta no se reingresa. " & s_Estado & "', '', 0, '" & s_RegID & "')"
                                        command.ExecuteNonQuery()
                                    End If
                                End If
                                'Intento finalizar la transaction.
                                transaction.Commit()
                            Catch ex As Exception
                                'Intento cancelar la transaction.
                                Try
                                    transaction.Rollback()
                                    strStreamWriter = File.AppendText(FilePathError)
                                    strStreamWriter.WriteLine(ex.Message & "(ID=" & s_idRecetaFLV & ")(XML=" & s_XML & ")")
                                    strStreamWriter.Close()
                                Catch ex2 As Exception
                                    'En el caso de que no se pueda hacer Rollback.
                                    strStreamWriter = File.AppendText(FilePathError)
                                    strStreamWriter.WriteLine(ex2.Message & "(ID=" & s_idRecetaFLV & ")(XML=" & s_XML & ")")
                                    strStreamWriter.Close()
                                End Try
                            End Try
                        End Using
                End Select
                strStreamWriter = File.AppendText(FilePathLOG)
                strStreamWriter.WriteLine("ID = " & s_idRecetaFLV & " - RECETA = " & s_Receta & " - ESTADO = " & s_Estado & " - " & IIf(s_Remito = "", "", "ENVIADA A FARMACIA"))
                strStreamWriter.Close()
            End If

        Catch ex As Exception
            'MessageBox.Show(ex.Message, "ERROR", MessageBoxButtons.OK, MessageBoxIcon.Error, MessageBoxDefaultButton.Button1, MessageBoxOptions.ServiceNotification, False)
            strStreamWriter = File.AppendText(FilePathLOG)
            strStreamWriter.WriteLine("ID = " & s_idRecetaFLV & " - RECETA = " & s_Receta & " - ERROR: " & ex.Message)
            strStreamWriter.Close()
        End Try
    End Sub
	