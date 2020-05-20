SELECT n.usuario_id, u.username, u.senha, n.niveis_acesso_id, a.niveis FROM jsst.niveis_acesso_usuario n
INNER JOIN jsst.niveis_acesso a ON jsst.n.niveis_acesso_id = jsst.a.id
INNER JOIN jsst.usuario u ON jsst.n.usuario_id = jsst.u.id
