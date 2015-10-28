defmodule Site.PageControllerTest do
  use Site.ConnCase

  test "GET /" do
    conn = get conn(), "/"
    assert html_response(conn, 200) =~ "Phoenix"
  end
end
