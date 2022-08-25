import { CarryOutOutlined, FormOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Form, Input, Row, Tree } from "antd"
import type { DataNode } from "antd/es/tree";
import { useEffect, useState } from "react"
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { NavLink } from "react-router-dom";

const data = [
  {
    "mId": 1,
    "mName": "Thức ăn, dinh dưỡng",
    "mDesc": "Hãy đến Huimitu mua Thức ăn cho thú cưng tiện lợi để sử dụng hàng ngày. Vừa tiết kiệm tiền và tốt cho sức khỏe của chúng . Thức ăn hạt khô tại Huimitu nổi tiếng về sự đa dạng và hạn sử dụng lâu dài. Sản phẩm có thể được cho ăn luôn hoặc trộn với thức ăn khác mà không cần cho vào tủ lạnh bảo quản.",
    "mDepth": 0,
    "mParent": null
  },
  {
    "mId": 2,
    "mName": "Thức ăn cho chó",
    "mDesc": "Thức ăn cho chó tại Huimitu được rất nhiều cún cưng ưa thích chính vì sự đa dạng của chúng. Từ kích cỡ, hương vị đến kết cấu. Việc này rất có lợi cho những người chủ chó. Vì họ có thể tìm được loại thức ăn mà phù hợp nhất với nhu cầu của cún cưng. Ngoài ra, với sự đa dạng của Các thương hiệu, sẽ rất khó để quyết định được sản phẩm cho chó nào sẽ phù hợp nhất. Khi đó bạn hãy tìm đến tư vấn của nhân viên chúng tôi để nhận được sự hỗ trợ đầy đủ nhất. Có nhiều loại thức ăn cho chó được thiết kế dành riêng cho giống, cân nặng và độ tuổi cụ thể của thú cưng của bạn. Với những lợi ích như giúp đào tạo, huấn luyện chú chó của bạn một cách tốt nhất. Những sản phẩm được bán tại Huimitu đều tạo ra bởi những thành phần giàu dưỡng chất. Dù cho chú chó của bạn hiếu động, lười biếng hay đã già… Bạn có thể hoàn toàn tin rằng Huimitu sẽ có những sản phẩm Dinh dưỡng cho chó tốt nhất đến từ những thương hiệu hàng đầu thế giới.",
    "mDepth": 1,
    "mParent": 1
  },
  {
    "mId": 3,
    "mName": "string",
    "mDesc": "string",
    "mDepth": 2,
    "mParent": 2
  },
  {
    "mId": 4,
    "mName": "Pate & Nước sốt cho chó",
    "mDesc": "Pate cho chó hay còn gọi là nước sốt nước súp cho chó đóng hộp với hương vị hấp dẫn sẽ không có gì ngạc nhiên khi hầu hết các chú chó đều thích ăn thức ăn ướt dành cho thú cưng. Thức ăn ướt thường có nhiều đạm và mỡ hơn so với Thức ăn cho chó thông thường. Tại Huimitu, bạn sẽ tìm thấy nhiều loại nước sốt, súp, pate cho chó đóng hộp với nhiều hương vị để lựa chọn như: thịt gà, thịt bò, gà tây, thịt cừu, cá…",
    "mDepth": 2,
    "mParent": 2
  },
  {
    "mId": 5,
    "mName": "Súp thưởng ăn liền cho chó",
    "mDesc": "Súp thưởng cho chó hiện đang được phát triển rộng rãi và được ghi điểm bởi kết cấu sản phẩm Thức ăn cho chó nổi bật. So với Pate cho chó, thì nguyên liệu của súp thưởng cho chó dường như được xay nhuyễn đến tuyệt đối đem lại sản phẩm soup mịn mượt và có thể tan ngay trong miệng khi chó vừa ăn. Súp thưởng phù hợp với tất cả các giống chó giúp cung cấp các vitamin Dinh dưỡng cho chó cần thiết. Có thể trộn cùng Thức ăn hạt cho chó hoặc sử dụng thay thế xương, Bánh thưởng cho chó tùy theo nhu cầu và hoạt động của cún cưng. Sản phẩm được sản xuất bởi nhiều thương hiệu nổi tiếng và phân phối bởi Huimitu.",
    "mDepth": 2,
    "mParent": 2
  },
  {
    "mId": 6,
    "mName": "Xương gặm & Bánh thưởng cho chó",
    "mDesc": "Bạn muốn sử dụng Bánh thưởng cho chó để cố gắng huấn luyện chú chó của mình hay chỉ đơn giản là cung cấp một bữa ăn nhẹ trong ngày? Huimitu cung cấp nhiều lựa chọn snack, bánh quy, xương gặm, bánh thưởng cho chó của bạn. Một số sản phẩm bánh thưởng cho chó thậm chí còn giúp hỗ trợ tăng cường sức khỏe cho răng miệng. Bánh thưởng cho chó con có thể dùng để huấn luyện chúng biết nghe lời. Sự kết hợp giữa hiệu lệnh ngồi, nằm đến việc đi vệ sinh đúng chỗ với sự khen thưởng đúng lúc sẽ đem lại những kết quả tích cực. Một chiếc bánh thưởng hoặc xương gặm Dinh dưỡng cho chó sẽ làm chúng thấy vui sướng cả ngày. Một món quà khích lệ tinh thần thật ý nghĩa.",
    "mDepth": 2,
    "mParent": 2
  },
  {
    "mId": 7,
    "mName": "Vitamin & Dinh dưỡng cho chó",
    "mDesc": "Các sản phẩm vitamin tổng hợp sẽ giúp bổ sung các chất Dinh dưỡng cho chó thiết yếu mà chúng cần. Tại Huimitu, chúng tôi luôn có đầy đủ mọi sản phẩm cho tất cả giai đoạn cuộc đời của cún cưng bao gồm các sản phẩm từ Thức ăn cho chó, sữa bột cho chó cho đến men kích thích tiêu hóa dưới dạng bột, viên nén và dầu dưỡng.",
    "mDepth": 2,
    "mParent": 2
  },
  {
    "mId": 8,
    "mName": "Bát ăn & Bình uống nước cho chó",
    "mDesc": "Bát ăn cho chó, tô ăn là đồ dùng chắc chắn bạn không thể bỏ qua. Đây chính là đồ vật gây thích thú nhất cho cún cưng. Mỗi khi nhìn thấy chiếc bát ăn xinh xắn này chúng sẽ rất hào hứng và mừng rỡ. Có rất nhiều loại bát ăn cho chó bạn có thể lựa chọn tại Huimitu. Đa phần các sản phẩm đều được thiết kế dựa trên nhu cầu ăn uống thiết thực của cún cưng. Những chiếc bát ăn cho chó giúp cho việc vệ sinh dễ dàng hơn. Khi phải thường xuyên vắng nhà, bạn nên lựa chọn bát ăn cho chó tự động. Một số kiểu bát ăn đôi, bát ăn chống gù, bát ăn chống kiến, bát ăn inox cho chó… cũng là sự lựa chọn của đông đảo khách hàng. Việc ăn và uống của cún cưng nên kết hợp với nhau. Một chiếc bát ăn sạch sẽ và an toàn sẽ khiến cún cưng hứng thú hơn. Ăn ngon miệng hơn và không còn bỏ bữa khiến bạn phải lo lắng nhiều nữa.",
    "mDepth": 2,
    "mParent": 2
  },
  {
    "mId": 9,
    "mName": "Thức ăn cho mèo",
    "mDesc": "Thức ăn cho mèo cung cấp một chế độ ăn uống cân bằng đối với sức khỏe tổng thể của mèo. Mỗi chú mèo có nhu cầu và sở thích khác nhau, do vậy thức ăn dành cho mèo cũng có nhiều thương hiệu, thành phần và hương vị khác nhau. Hệ tiêu hóa của mèo khá nhạy cảm, một số thức ăn thông thường có vẻ sẽ không phù hợp với mèo cưng. Chính vì thấu hiểu điều này, Huimitu luôn mang đến cho những chú mèo cưng những gì tốt nhất. Các thương hiệu thức ăn cho mèo đều đạt các tiêu chuẩn quốc tế về chất lượng. Khẩu phần ăn của mèo cưng bao gồm hai loại thức ăn chính. Với các hương vị thiên nhiên từ thịt, cá và củ quả kích thích mèo cưng ăn ngon. Đồng thời giảm thiểu các bệnh về đường tiết niệu, tiêu hóa hoặc dị ứng. Vậy làm thế nào để lựa chọn thức ăn tốt nhất cho mèo? Cách tốt nhất là hãy đánh giá nhu cầu của mèo, sau đó hãy tham khảo ý kiến từ nhân viên bán hàng của Huimitu để được tư vấn đầy đủ nhất.",
    "mDepth": 1,
    "mParent": 1
  },
  {
    "mId": 10,
    "mName": "Thức ăn hạt khô cho mèo",
    "mDesc": "Thức ăn hạt cho mèo là dạng thức ăn được sấy khô và có cấu tạo dạng hạt. Đảm bảo phù hợp với khuôn miệng của tất cả  giống mèo. Thức ăn cho mèo là hỗn hợp các thành phần như ngũ cốc, thịt và các sản phẩm phụ của thịt, chất béo, khoáng chất và vitamin. Được các nhà sản xuất tính toán cân bằng hàm lượng dinh dưỡng phù hợp với từng loại thú cảnh khác nhau và từng lứa tuổi khác nhau. Với loại thức ăn hạt cho mèo này, bạn sẽ có nhiều sự lựa chọn phù hợp với mèo cưng tại Huimitu. Mà vẫn luôn đảm bảo được tình trạng sức khỏe cân đối và phát triển toàn diện.",
    "mDepth": 2,
    "mParent": 9
  },
  {
    "mId": 11,
    "mName": "Pate & Nước sốt cho mèo",
    "mDesc": "Pate cho mèo là một dạng thức ăn ướt. Loại thức ăn này cung cấp cho mèo cưng đầy đủ các chất dinh dưỡng từ thịt và cá. Kết hợp với một số loại rau củ cân bằng dinh dưỡng, giảm rõ rệt tỷ lệ béo phì ở mèo. Với các hương vị đặc trưng, bạn có nhiều sự lựa chọn để thay đổi khẩu vị của mèo cưng theo từng giai đoạn phát triển. Bạn không cần phải mất quá nhiều thời gian để tìm hiểu cách làm pate cho mèo yêu. Hiện tại, Huimitu có đầy đủ các loại pate cho mèo con. Hương vị thơm tươi ngon, giàu dinh dưỡng, kích thích mèo ăn ngon. Tất cả đều được bảo quản dưới dạng gói hoặc lon rất thuận tiện cho việc sử dụng. Nếu bạn không có quá nhiều thời gian thì đây chính là một sự lựa chọn hoàn hảo.",
    "mDepth": 2,
    "mParent": 9
  },
  {
    "mId": 12,
    "mName": "Súp thưởng ăn liền cho mèo",
    "mDesc": "Súp thưởng cho mèo hiện nay đang được khá nhiều người nuôi mèo quan tâm và sử dụng. Khác với Pate cho mèo, súp thưởng cho mèo cực kỳ nhuyễn và có thể dùng làm Thức ăn cho mèo ăn vặt hằng ngày. Hoặc sử dụng như Bánh thưởng cho mèo. Có thể kể đến một số thương hiệu nổi tiếng hiện nay đang sản xuất như: CIAO, IRIS OHYAMA … đều đến từ Nhật Bản. Không những thế, soup thưởng còn ghi điểm bởi kết cấu đặc biệt vô cùng nổi bật. Tất cả các nguyên liệu dường như được xay nhuyễn tuyệt đối. Mang lại kết cấu kem, mịn mượt, có thể tan ngay khi mèo vừa ăn. Nguồn dinh dưỡng trong thức ăn được đảm bảo dồi dào, bồi bổ sức khỏe cho bé tiếp tục phát triển khỏe mạnh. Rất phù hợp cho mọi đối tượng mèo.",
    "mDepth": 2,
    "mParent": 9
  },
  {
    "mId": 13,
    "mName": "Snach & Bánh thưởng cho mèo",
    "mDesc": "Bánh thưởng cho mèo chính là món quà mà chủ nhân nên dành tặng cho mèo cưng. Bạn có thể sử dụng trong việc huấn luyện mèo con. Phần thưởng có thể là một chiếc bánh quy, cũng có thể là một gói Snack. Với mèo yêu thì còn gì tuyệt vời hơn nữa chứ. Chắc chắn chúng sẽ vui mừng mà răm rắp nghe lời bạn. Tuy là bánh thưởng không phải là dạng Thức ăn hạt cho mèo nhưng cũng thơm ngon, hợp khẩu vị không kém. Có như vậy thì mèo cưng mới chịu nha. Tại Huimitu, bạn có thể tự do lựa chọn bánh thưởng cho mèo với đầy đủ các hương vị. Từ cá hồi, thịt gà, gan, rau củ quả, thập cẩm…. Các thương hiệu sản phẩm Thức ăn cho mèo nổi tiếng như Trixie, Jerhigh đều là những thương hiệu được yêu thích nhất hiện nay. Và chắc chắn rằng, với những chiếc bánh thưởng này sẽ khiến chú mèo của bạn ngày một ngoan ngoãn hơn.",
    "mDepth": 2,
    "mParent": 9
  },
  {
    "mId": 14,
    "mName": "Vitamin & Dinh dưỡng cho mèo",
    "mDesc": "Dinh dưỡng cho mèo có thể được đáp ứng qua khẩu phần ăn hàng ngày. Tuy nhiên, bạn có chắc chắn rằng bạn đã cung cấp đầy đủ các chất dinh dường cần thiết cho sự phát triển của mèo. Đặc biệt là dinh dưỡng cho mèo mang thai và mèo con. Bạn có thể bổ sung thêm chất cho chúng bằng gel dinh dưỡng cho mèo. Hoặc một số loại kem, thuốc chuyên dụng. Các loại vitamin tăng cường canxi, Omega 3 & 6 giúp làm đẹp lông, da, bảo vệ dạ dày và hệ tiêu hóa. Ngoài ra, Huimitu còn cung cấp các loại sữa bột cho mèo con sơ sinh. Các sản phẩm đảm bảo chất lượng cao và an toàn tuyệt đối. Việc sử dụng kết hợp dinh dưỡng ngoài góp phần bảo vệ sức khỏe cho mèo yêu. Đồng thời bổ sung lượng dinh dưỡng thiếu hụt giúp mèo cưng có thể phát triển một cách toàn diện.",
    "mDepth": 2,
    "mParent": 9
  },
  {
    "mId": 15,
    "mName": "Cỏ mèo & Catnip",
    "mDesc": "Cỏ cho mèo được coi là một loại thức ăn hỗ trợ sức khỏe. Tác dụng của nó thì vô cũng tuyệt vời. Với hạt giống cỏ lúa mì cho mèo, bạn có thể làm không gian sống của bạn xanh hơn. Những chú mèo rất thích thú với loại cỏ này. Không đơn thuần là để gặm nhấm thông thường. Chúng còn giúp loại bỏ những búi lông rối nằm gọn trong bụng mèo cưng. Việc liếm láp vệ sinh hàng ngày không tránh khỏi việc chúng nuốt phải lông của chính mình. Ngoài ra, còn có Catnip cỏ bạc hà cho mèo dạng khô. Sản phẩm đơn giản chỉ là giúp mèo cưng của chúng ta xả stress. Bạn có thể để catnip vào đồ chơi của mèo cưng để chúng chơi đùa vui vẻ hơn. Chỉ cần tới Huimitu, bạn sẽ không còn phải lo lắng mèo cưng buồn mỗi khi bạn vắng nhà nữa nhé.",
    "mDepth": 2,
    "mParent": 9
  },
  {
    "mId": 16,
    "mName": "Bát ăn & Bình uống nước cho mèo",
    "mDesc": "Bát ăn cho mèo tại Huimitu bao gồm bát bằng inox, nhựa, cao su… Ưu điểm nổi bật của các sản phẩm này là tính thẩm mỹ và độ bền cao. Với những chiếc bát ăn bằng chất liệu inox còn có đế cao su để chống trơn, trượt. Mèo cưng thậm chí có thể coi đây như một món đồ chơi. Và có vẻ như chúng rất thích điều này. Vậy là mèo cưng vừa có bát ăn, vừa có đồ để chơi. Ngoài ra, tại Huimitu còn có chén ăn tự động và bát ăn chống kiến. Với các tính năng nổi trội là tiết kiệm thời gian và giữ thức ăn tránh khỏi lũ kiến tha mồi. Cách sử dụng rất đơn giản và tiện lợi. Bạn chỉ cần hẹn giờ thức ăn và nước uống sẽ tự động chảy xuống. Dù bạn có vắng nhà trong thời gian khá dài đi chăng nữa thì mèo cưng của bạn vẫn được ăn uống rất đầy đủ.",
    "mDepth": 2,
    "mParent": 9
  },
  {
    "mId": 17,
    "mName": "Vệ sinh, chăm sóc",
    "mDesc": "Chăm sóc thú cưng hàng ngày là công việc rất quan trọng. Việc này giúp thú cưng của bạn luôn khỏe mạnh và hạnh phúc. Ngoài việc chăm sóc sức khỏe bạn còn phải chăm sóc sắc đẹp cho thú cưng. Chúng cũng cần được vệ sinh răng miệng, được cắt tỉa lông, tắm và chăm sóc y tế định kỳ. Và bạn có thể giải quyết mọi vấn đề trên khi đến với Huimitu. Với sự đa dạng về sản phẩm, đảm bảo về chất lượng với các thương hiệu chăm sóc thú cưng hàng đầu thế giới. Bạn có thể tin tưởng tuyệt đối vì chúng đều được khuyên dùng bởi các chuyên gia.",
    "mDepth": 0,
    "mParent": null
  },
  {
    "mId": 18,
    "mName": "Chăm sóc cho chó",
    "mDesc": "Vật dụng chăm sóc chó hàng ngày là những đồ dùng rất quan trọng. Việc này giúp chú chó của bạn luôn khỏe mạnh và hạnh phúc. Nhưng liệu rằng bạn đã biết cách chăm sóc chúng đúng cách hay chưa? Chăm sóc ở đây không đơn giản chỉ là chuyện cung cấp đầy đủ thức ăn và nước uống mà cún cưng của chúng ta cần nhiều hơn thế. Ngoài việc chăm sóc sức khỏe bạn còn phải chăm sóc sắc đẹp cho cún cưng. Một chú cún không thể khỏe mạnh nếu có bộ lông quá rối và bết. Trên người có quá nhiều vấn đề về da do ký sinh trùng gây ra. Chó con cũng cần được vệ sinh răng miệng, được cắt tỉa lông, tắm và chăm sóc y tế định kỳ. Và bạn có thể giải quyết mọi vấn đề trên khi đến với Huimitu. Với sự đa dạng về sản phẩm, đảm bảo về chất lượng với các thương hiệu chăm sóc cún cưng hàng đầu thế giới. Bạn có thể tin tưởng tuyệt đối vì chúng đều được khuyên dùng bởi các chuyên gia.",
    "mDepth": 1,
    "mParent": 17
  },
  {
    "mId": 19,
    "mName": "Tã bỉm & Tấm lót vệ sinh cho chó",
    "mDesc": "Không phải lúc nào chú chó của bạn cũng đi vệ sinh đúng chỗ. Tại Huimitu có rất nhiều lựa chọn Miếng tấm lót cho chó và Tã bỉm cho chó. Nếu khu vực bạn sống không có sẵn những khoảng sân vườn, thì tấm lót huấn luyện chó đi vệ sinh đúng chỗ sẽ cho phép bạn dạy cún cưng đi vệ sinh đúng nơi chỉ định. Hơn nữa, những miếng lót vệ sinh cho chó này còn rất lý tưởng cho việc huấn luyện chó vào trong chuồng hoặc lồng. Tấm miếng lót vệ sinh cho chó không chỉ sử dụng cho chó con, mà còn có thể áp dụng với những chú chó trưởng thành, hoặc các chú chó có bệnh bí tiểu thiếu tự chủ.",
    "mDepth": 2,
    "mParent": 18
  },
  {
    "mId": 20,
    "mName": "Khay hướng dẫn vệ sinh cho chó",
    "mDesc": "Bạn đang gặp quá nhiều vấn đề rắc rối có liên quan tới việc đi vệ sinh của cún cưng? Khay vệ sinh cho chó sẽ giúp bạn giải quyết vấn đề này. Giúp cún cưng có thể đi vệ sinh đúng chỗ, đúng nơi quy định. Hơn thế có thể tiết kiệm rất nhiều thời gian cho cả bạn và chó yêu. Bạn không nên bỏ qua sản phẩm hữu ích này. Tại Huimitu có bán khay vệ sinh cho chó đầy đủ các kích cỡ cho chó từ nhỏ đến lớn, từ chó đực đến chó cái. Sản phẩm nên kết hợp với Tấm lót vệ sinh cho chó để gia tăng sự hiệu quả trong quá trình huấn luyện chó đi vệ sinh đúng chỗ. Một số trường hợp đặc biệt bạn có thể xem thêm các sản phẩm Tã bỉm cho chó sao cho phù hợp với nhu cầu và mục đích sử dụng. Với sản phẩm tiện ích này, cún cưng vẫn có thể vô tư đi vệ sinh khi bạn không thể dắt chúng ra ngoài. Và một điều chắc chắn là không gian sống của gia đình bạn sẽ trở nên sạch sẽ và thơm tho hơn rất nhiều.",
    "mDepth": 2,
    "mParent": 18
  },
  {
    "mId": 21,
    "mName": "Sữa tắm & Xịt dưỡng cho chó",
    "mDesc": "Việc sử dụng Sữa tắm cho chó phù hợp giúp cún cưng khỏe mạnh hơn. Đặc biệt là đối với những chú chó lông dài và dày. Tại Huimitu có các loại sữa tắm cho chó khác nhau… Các sản phẩm đều đến từ những thương hiệu lớn, được đông đảo khách hàng tin dùng. Đây là các sản phẩm đã được kiểm định về chất lượng. Nồng độ PH không gây ra kích ứng, dị ứng cho da. Đặc biệt, chúng lưu giữ được những mùi hương hoa dịu nhẹ trong thời gian dài. Ngoài ra, bạn có thể tìm kiếm ngay tại Huimitu các sản phẩm chăm sóc lông cho cún yêu. Các dòng sữa tắm giữ màu lông bền hoặc đặc trị ve rận luôn mang lại những kết quả tốt nhất. Sử dụng sữa tắm cho cún cưng đúng cách chính là cách chăm sóc sức khỏe cho chúng tốt nhất.",
    "mDepth": 2,
    "mParent": 18
  },
  {
    "mId": 22,
    "mName": "Lược chải lông cho chó",
    "mDesc": "Lược chải lông chó sẽ giúp cho bộ lông của cún cưng trở lên suôn mềm và bớt rối hơn. Không ít chủ nhân lo sợ khi thấy bộ lông của chú cún nhà mình mỗi ngày một dài ra. Khi lông dài sẽ kéo theo tình trạng rối lông. Một số trường hợp còn bị rối vón cục. Thậm chí còn phải cắt phần rối khiến cún cưng trở nên nham nhở. Vẻ đẹp của con người thể hiện qua mái tóc, những chú cún cưng cũng vậy. Bộ lông chính là tài sản vô giá của chúng. Tại sao bạn không khắc phục điều này ngay tại Pet Mart. Một số sản phẩm có thể bạn quan tâm như: lược chải lông rụng cho chó, lược chải lông chuyên dụng cho từng giống chó… Với những chiếc lược chải lông chó bạn có thể khiến cún cưng trở nên xinh đẹp hơn ngay tại nhà mình.",
    "mDepth": 2,
    "mParent": 18
  },
  {
    "mId": 23,
    "mName": "Máy mài & Kìm cắt móng cho chó",
    "mDesc": "Tông đơ cắt lông chó là một trong những sản phẩm làm đẹp và chăm sóc sức khỏe cho cún cưng. Với những giống chó lông dài thì việc cắt tỉa lông chó bằng tông đơ không còn quá xa lạ. Việc sử dụng tông đơ cạo lông chó để thay bộ áo mới cho những chú chó Poodle ngày càng trở lên phổ biến. Tông đơ còn được dùng trong nhiều trường hợp khác nữa. Ví dụ như: chó bị các bệnh về da, ghẻ, nấm, ve rận… Việc cắt cạo lông giúp bạn có thể bôi thuốc cho cún cưng dễ dàng. Cún sẽ nhanh chóng lành bệnh hơn. Bạn có thể dễ dàng mua tông đơ cắt lông chó ngay tại Huimitu. Với các sản phẩm chính hãng từ thương hiệu Codos có kèm theo lưỡi rời. Với đầy đủ các kích cỡ điều chỉnh phù hợp với tất cả các giống chó.",
    "mDepth": 2,
    "mParent": 18
  },
  {
    "mId": 24,
    "mName": "Tông đơ cạo lông cho chó",
    "mDesc": "Tông đơ cắt lông chó là một trong những sản phẩm làm đẹp và chăm sóc sức khỏe cho cún cưng. Với những giống chó lông dài thì việc cắt tỉa lông chó bằng tông đơ không còn quá xa lạ. Việc sử dụng tông đơ cạo lông chó để thay bộ áo mới cho những chú chó Poodle ngày càng trở lên phổ biến. Tông đơ còn được dùng trong nhiều trường hợp khác nữa. Ví dụ như: chó bị các bệnh về da, ghẻ, nấm, ve rận… Việc cắt cạo lông giúp bạn có thể bôi thuốc cho cún cưng dễ dàng. Cún sẽ nhanh chóng lành bệnh hơn. Bạn có thể dễ dàng mua tông đơ cắt lông chó ngay tại Huimitu. Với các sản phẩm chính hãng từ thương hiệu Codos có kèm theo lưỡi rời. Với đầy đủ các kích cỡ điều chỉnh phù hợp với tất cả các giống chó.",
    "mDepth": 2,
    "mParent": 18
  },
  {
    "mId": 25,
    "mName": "Máy sấy lông cho chó",
    "mDesc": "Máy sấy lông chó giúp cún cưng trở nên khô ráo nhanh chóng sau khi tắm. Nếu để tình trạng lông ướt quá lâu sẽ khiến chúng bị cảm lạnh. Thậm chí có thể mắc một số căn bệnh về da. Ví dụ như ghẻ, nấm, viêm da… Việc sử dụng máy sấy thông thường không mang lại kết quả tốt. Công suất quá thấp không thể cải thiện bộ lông ướt của cún cưng. Bạn cần phải sử dụng một loại máy sấy khác phù hợp hơn. Bạn có thể tìm kiếm giải pháp ngay tại Huimitu với các loại máy sấy lông cho chó chuyên dụng. Với các thương hiệu máy sấy lông chó, bạn có thể yên tâm trong việc bảo vệ sức khỏe cho chó yêu. Kết hợp với công nghệ xử lý thông minh, âm thanh ở dạng tĩnh siêu nhỏ sẽ khiến cún cưng của bạn cảm thấy an toàn hơn. Và tất nhiên chúng cũng không còn sợ phải tắm như trước nữa.",
    "mDepth": 2,
    "mParent": 18
  },
  {
    "mId": 26,
    "mName": "Chăm sóc cho mèo",
    "mDesc": "Chăm sóc mèo là công việc không hề dễ dàng. Một chú mèo được coi là phát triển cân bằng khi cả thể chất và tinh thần đều tốt. Không chỉ đơn giản là việc ăn uống, hoạt động vui chơi và làm đẹp cũng vô cùng quan trọng. Để chăm sóc chúng thật tốt bạn cần dành một chút thời gian để tìm hiểu về chú mèo của bạn. Thấu hiểu được điều đó, Huimitu mang tới cho mèo cưng của bạn những sản phẩm tốt nhất. Phù hợp với việc chăm sóc mèo con cho tới khi chúng trưởng thành. Thông qua các sản phẩm sữa tắm, lược chải lông, nhà cây và chuồng cho mèo. Tất cả đều đảm bảo mang tới cho mèo cưng một sức khỏe dẻo dai, luôn vui vẻ và hạnh phúc. Góp phần xây dựng một môi trường sống thân thiện.",
    "mDepth": 1,
    "mParent": 17
  },
  {
    "mId": 27,
    "mName": "Khay & Nhà vệ sinh cho mèo",
    "mDesc": "Khay vệ sinh, Nhà vệ sinh cho mèo là một đồ dùng rất tiện lợi cho cả bạn và mèo cưng. Ngay khi mới bắt đầu nuôi mèo chắc hẳn việc đi vệ sinh của chúng gây nhiền phiền toái đến bạn. Làm thế nào để mèo cưng đi vệ sinh đúng chỗ quy định? Bạn đừng lo lắng quá, tại Huimitu có đầy đủ các sản phẩm có thể giúp bạn giải quyết những phiền phức đó. Khay vệ sinh, nhà vệ sinh cho mèo được thiết kế cực kỳ thông minh. Các khay có các điểm gờ chống cát bị đổ ra ngoài. Nhà vệ sinh khép kín, tạo không gian yên tĩnh cho mèo cưng. Hạn chế tối thiểu mùi khó chịu có thể ảnh hưởng tới môi trường sống của bạn. Với màu sắc đa dạng, chất liệu nhựa bền rất thuận tiện cho việc vệ sinh và lau dọn.",
    "mDepth": 2,
    "mParent": 26
  },
  {
    "mId": 28,
    "mName": "Cát vệ sinh cho mèo",
    "mDesc": "Cát vệ sinh cho mèo giúp mèo cưng đi vệ sinh sạch sẽ và thơm tho hơn. Huimitu có đầy đủ các loại cát cho mèo giá rẻ. Cát đất, cát thủy tinh là hai loại cát được yêu thích và ưa chuộng nhất. Chúng mang lại nhiều lợi ích với các tính năng vô cùng đặc biệt. Đó là khả năng thấm hút nước siêu tốc, độ vón cục cao, mùi thơm dịu nhẹ, dễ chịu. Tất cả được hội tụ trong một sản phẩm chất lượng cao. Việc sử dụng cát cho mèo sẽ giúp môi trường sống của bạn được cải thiện đáng kể. Bạn sẽ không cần lo lắng về chuyện quần áo hoặc đồ dùng trong gia đình bị ám mùi rác thải vệ sinh của mèo cưng nữa. Những hạt cát tuy nhỏ nhưng đem lại những giá trị lợi ích vô cùng to lớn.",
    "mDepth": 2,
    "mParent": 26
  },
  {
    "mId": 29,
    "mName": "Sữa tắm & Xịt dưỡng cho mèo",
    "mDesc": "Bạn có thường xuyên sử dụng Sữa tắm cho mèo hay không? Dù là loài không thích nước nhưng việc tắm cho mèo là rất cần thiết. Lông và da mèo khá nhạy cảm nếu sử dụng sữa tắm không đúng rất có thể khiến chúng mắc các bệnh về da. Hiện tại, Huimitu chuyên cung cấp các sản phẩm sữa tắm chất lượng cao. Độ PH phù hợp không gây kích ứng da. Được chiết xuất từ thảo dược và hương hoa thiên nhiên mang lại cho mèo cưng mùi thơm dễ chịu. Bạn sẽ luôn cảm thấy muốn ôm mèo cưng mãi không rời. Đặc biệt, còn có một số loại sữa tắm chuyên dụng và đặc trị bệnh. Ví dụ như sữa tắm cho mèo lông trắng, sữa tắm trị rận cho mèo giúp chúng giữ được màu lông và phòng tránh các loại kí sinh trùng gây hại.",
    "mDepth": 2,
    "mParent": 26
  },
  {
    "mId": 30,
    "mName": "Lược chải lông cho mèo",
    "mDesc": "Lược chải lông mèo là dụng cụ đắc lực giúp bạn chăm sóc lông của mèo cưng tốt hơn. Một số giống mèo lông dài nếu không được chải lông thường xuyên sẽ bị rối vón cục. Nặng hơn có thể mắc một số bệnh về da rất nguy hiểm. Nếu việc sử dụng lược gỡ rối cũng không thể cải thiên được tình trạng trên thì thật đáng tiếc, bạn phải cắt đi bộ lông xinh đẹp của chúng. Điều đó sẽ khiến mèo cưng trở nên buồn phiền, thậm chí là stress. Bạn có thể khắc phục việc này bằng cách mua lược chải lông mèo tại Huimitu. Rất nhiều sản phẩm cho bạn lựa chọn. Một chiếc lược chải rụng lông cho mèo là rất cần thiết, chúng có thể giúp bạn tránh khỏi việc lông mèo rụng rơi vãi khắp nhà. Thậm chí là bám vào quần áo rất khó để làm sạch.",
    "mDepth": 2,
    "mParent": 26
  },
  {
    "mId": 31,
    "mName": "Máy mài & Kìm cắt móng cho mèo",
    "mDesc": "Mèo sử dụng móng chân để cào, nhảy và leo trèo. Hãy luôn chăm sóc và giữ gìn cho móng vuốt của mèo vừa đủ dài để đảm bảo sức khỏe và an toàn cho chúng định kỳ. Các dụng cụ Kìm cắt móng cho mèo, máy mài móng, kềm dũa… cho mèo tại Huimitu rất đa dạng để lựa chọn theo từng nhu cầu. Việc cắt móng cho mèo cũng không quá phức tạp. Chỉ cần chú ý phần tủy của chúng, để tránh cắt quá sâu khiến móng mèo bị chảy máu. Bảo vệ móng cho mèo con của bạn và đồ đạc trong nhà với kềm cắt móng cho mèo cửa Huimitu, nơi bạn có thể tìm thấy những sản phẩm tốt nhất dành cho mèo cưng.",
    "mDepth": 2,
    "mParent": 26
  },
  {
    "mId": 32,
    "mName": "Đồ dùng, phụ kiện",
    "mDesc": "Đồ dùng, phụ kiện cho thú cưng tại Huimitu nổi bật với sự đa dạng về sản phẩm. Bao gồm tất cả những vật dụng cần thiết cho sự sinh hoạt và phát triển của thú cưng. Phụ kiện chó mèo ngày trở nên quan trọng với đời sống của thú cưng. Tại Huimitu, bạn có thể mua sắm thả ga mà không lo về giá. Sản phẩm có đủ các size, mẫu mã phù hợp với mọi giống chó mèo và lứa tuổi. Còn gì hạnh phúc hơn khi thấy người bạn bốn chân được sống trong môi trường thân thiện với đầy đủ các tiện nghi. Khi trời lạnh chúng được khoác trên mình những chiếc áo lông ấm áp. Và khi chúng trở về nhà có một không gian riêng để nghỉ ngơi. Không chỉ khiến chúng trở nên xinh xắn hơn, phụ kiện còn giúp cún cưng cảm thấy được yêu thương và hạnh phúc.",
    "mDepth": 0,
    "mParent": null
  },
  {
    "mId": 33,
    "mName": "Phụ kiện cho chó",
    "mDesc": "Không chỉ khiến chúng trở nên xinh xắn hơn, phụ kiện còn giúp cún cưng cảm thấy được yêu thương và hạnh phúc. Phụ kiện cho chó tại Hà Nội, TP.HCM, Đà Nẵng và Hải Phòng giá rẻ chỉ có tại Huimitu. Tại đây, bạn có thể mua sắm thả ga mà không lo về giá. Các phụ kiện cho chó như: Vòng cổ dây dắt chó, Quần áo cho chó, Rọ mõm cho chó… siêu bền, siêu đẹp và cực kỳ đa dạng. Sản phẩm có đủ các size, mẫu mã phù hợp với mọi giống chó và lứa tuổi. Với tất cả các sự lựa chọn về phụ kiện cho chó chất lượng tại Huimitu, bạn và chú chó của mình sẽ tiên phong sẵn sàng cho mọi hành trình sắp tới.",
    "mDepth": 1,
    "mParent": 32
  },
  {
    "mId": 34,
    "mName": "Quần áo & Mũ nón cho chó",
    "mDesc": "Huimitu cung cấp những loại váy, Quần áo cho chó thời trang và tiện dụng. Tại đây bạn có rất nhiều sự lựa chọn, bao gồm cả quần áo mùa đông lẫn mùa hè. Tất cả sản phẩm Phụ kiện cho chó đều có giá rẻ nhất thị trường Hà Nội, TP.HCM, Đà Nẵng và Hải Phòng hiện nay. Với sự đa dạng về kích cỡ đảm bảo cún cưng sẽ được mặc những bộ trang phục chuẩn size nhất. Cam kết không ở đâu có nhiều mẫu mã quần áo thú cưng đẹp và đa dạng bằng Huimitu. Bạn cho chó mặc quần áo càng sớm càng tốt, chúng sẽ làm quen và thích nghi rất nhanh. Vào những ngày giá lạnh, Huimitu có bán nhiều mẫu áo như: áo khoác, áo choàng, hoodie. Tất cả đều có lớp lông dày để giữ nhiệt cho cún cưng.",
    "mDepth": 2,
    "mParent": 33
  },
  {
    "mId": 35,
    "mName": "Vòng cổ & Dây dắt cho chó",
    "mDesc": "Chú chó của bạn thích đi chơi chứ? Nhưng chúng lại chạy quá nhanh hoặc không nghe lời bạn, đã đến lúc bắt đầu phải huấn luyện cún cưng của bạn với Vòng cổ & dây dắt cho chó rồi. Không có gì lạ lẫm với những người mới bắt đầu nuôi chó khi không thể giữ chúng đứng yên được một chỗ. Bởi kỹ năng đó cần phải được trải qua giai đoạn huấn luyện căn bản. Huimitu có đầy đủ các sản phẩm Phụ kiện cho chó, vòng cổ, dây xích, dây dắt cho chó chú của bạn được an toàn khi đi ra ngoài đường. Với đa dạng các kích cỡ khác nhau và chất liệu, chúng tôi đáp ứng hầu hết các nhu cầu của khách hàng và thú cưng. Các sản phẩm đều được đảm bảo an toàn cho cún cưng của bạn yên tâm sử dụng.",
    "mDepth": 2,
    "mParent": 33
  },
  {
    "mId": 36,
    "mName": "Rọ mõm",
    "mDesc": "Rọ mõm cho chó là một sản phẩm tốt trong việc kiểm soát chú chó của bạn khi đưa chúng đi ra đường. Vừa thực hiện đúng pháp luật quy định lại vừa an toàn, kết hợp với Vòng cổ dây dắt chó đầy đủ thì đi đâu bạn cũng sẽ cảm thấy yên tâm. Hãy cùng khám phá những sản phẩm rọ mõm cho chó bán chạy nhất tại Huimitu. Những sản phẩm Phụ kiện cho chó dưới dạng rọ mõm được thiết kế đáng yêu, có thể là dưới hình dạng một chiếc mỏ vịt. Cũng có thể là những chiếc rọ mõm dạng lưới, bằng da hoặc bằng nhựa silicon có thể điều chỉnh kích cỡ từ nhỏ tới to lớn một cách linh động. Có rất nhiều thiết kế đa dạng phù hợp với các giống chó khác nhau như Alaska, Pug, Poodle… Với những chiếc rọ mõm xinh xắn này, khoác lên mình bộ Quần áo cho chó so kool nữa chắc chắn cún con sẽ thu hút mọi ánh nhìn. Hãy đeo ngay một chiếc rọ mõm cực kì cute cho cún cưng tại Huimitu ngay hôm nay nhé!",
    "mDepth": 2,
    "mParent": 33
  },
  {
    "mId": 37,
    "mName": "Đồ chơi & Huấn luyện cho chó",
    "mDesc": "Đồ chơi cho chó giúp cho những người bạn bốn chân vui vẻ và thư giãn. Tạo dựng những phản xạ linh hoạt với môi trường sống. Tại Huimitu có tất cả các đồ chơi cho sự phát triển toàn diện của cún cưng. Đồng thời, xây dựng mối quan hệ thân thiện và gần gũi giữa chủ nhân và cún con. Điều này thật sự rất tuyệt vời đúng không? Một quả bóng tròn, đồ chơi dây thừng hay đĩa bay huấn luyện có thể giúp cún cưng có thể lực tốt hơn. Việc chạy nhảy sẽ giúp xương khớp dẻo dai hơn. Một chiếc xương đồ chơi cho chó giúp chúng có một bộ răng chắc khỏe. Với những món đồ chơi này bạn sẽ không còn phải lo lắng về chuyện phá phách của chúng nữa. Một món đồ chơi cho chó con phù hợp sẽ giúp bạn bảo vệ đồ đạc trong nhà một cách hiệu quả nhất.",
    "mDepth": 2,
    "mParent": 33
  },
  {
    "mId": 38,
    "mName": "Địu chó",
    "mDesc": "Địu chó là một trong những phương tiện cực kỳ đơn giản giúp bạn có thể Vận chuyển chó đi tới bất kỳ nơi đâu mà bạn muốn. Có thể là đi dạo, đi du lịch hay vi vu shopping. Tại Huimitu luôn có sẵn những mẫu địu cho chó mèo cực kỳ dễ thương. Đặc biệt, sự kết hợp giữa vải cotton và da đem lại cảm giác chắc chắn. Sản phẩm mẫu mã đa dạng về size, phù hợp với cả những chú cún có cân nặng trung bình. Ưu điểm của địu chó là tiện lợi, bền đẹp và thời trang. Sự đa dạng về màu sắc và họa tiết chính là điểm nhấn cho sản phẩm này. Đặc biệt, bạn và cún cưng sẽ đều cảm thấy thoái mái và vui vẻ sau mỗi lần rong chơi. Những người bạn bốn chân sẽ cảm thấy rất hạnh phúc khi được chủ nhân địu sau lưng hoặc ngay trước ngực. Một cảm giác thật sự rất an toàn và ấm áp.",
    "mDepth": 2,
    "mParent": 33
  },
  {
    "mId": 39,
    "mName": "Túi xách chó",
    "mDesc": "Túi xách chó được coi là phương tiện để Vận chuyển chó và đưa chúng đi xa. Có thể du lịch hay đi mua sắm. Sản phẩm được thiết kế gọn, nhẹ với các kiểu dáng hợp thời trang. Kết hợp với họa tiết trang trí ngộ nghĩnh đa dạng màu sắc. Một số sản phẩm túi xách cứng cho chó phù hợp với cả những chú cún nhỏ nhắn có xu hướng phát triển về cân nặng. Ngoài ra, tại Huimitu còn bổ sung thêm rất nhiều loại túi xách chó khác nhau. Có thể nhắc đến như Địu chó, túi xách vòm cho chó, túi xách da cho chó. Ngoài ra cũng phải kể đến Lồng vận chuyển chó nếu bạn có kế hoạch đưa thú cưng đi bằng đường hàng không. Nếu bạn có ý định vi vu cùng cún cưng thì nhất định phải sắm cho mình một chiếc túi xách thật là dễ thương ngay nhé.",
    "mDepth": 2,
    "mParent": 33
  },
  {
    "mId": 40,
    "mName": "Balo đựng chó",
    "mDesc": "Lồng vận chuyển chó mèo bằng nhựa là một sản phẩm lý tưởng cho gia đình khi di chuyển hoặc đi du lịch cũng như chuyển chó bằng đường hàng không. Sản phẩm còn được sử dụng như một chiếc chuồng chó thông thường khi để trong nhà, giúp ngăn chặn các thói quen cắn phá đồ đạc của thú cưng một cách thiết thực. Huimitu có đầy đủ kích thước lồng vận chuyển cho tất cả các giống chó lớn nhỏ khác nhau từ size XS cho đến XXL. Bạn có thể tìm được một chiếc lồng vận chuyển cho chó phù hợp nhất bằng cách đo từ mũi đến đuôi của chó và cộng thêm 2-4 inch nữa là vừa vặn. Phần lớn các sản phẩm lồng vận chuyển chó mèo đều có cánh cửa bằng thép chịu lực bảo vệ cho thú cưng an toàn đến từ các thương hiệu nổi tiếng như: PAW (Anh), IRIS (Nhật). Các lỗ thông gió ở mặt sau và thành 2 bên sẽ mang lại cho cún cưng môi trường trong lồng tuần hoàn không khí một cách thoải mái.",
    "mDepth": 2,
    "mParent": 33
  },
  {
    "mId": 41,
    "mName": "Phụ kiện cho mèo",
    "mDesc": "Phụ kiện cho mèo tại Huimitu nổi bật với sự đa dạng về sản phẩm. Bao gồm tất cả những vật dụng cần thiết cho sự sinh hoạt và phát triển của mèo cưng. Có thể kể tới như: chuông lục lạc, nơ, vòng cổ, quần áo, địu cho mèo… Phụ kiện chó mèo ngày trở nên quan trọng với đời sống của thú cưng. Đối với những chú mèo phụ kiện sẽ khiến chúng trở nên xinh đẹp hơn. Âm thanh của chiếc chuông có thể giúp chủ nhân định vị vị trí mỗi khi mèo cưng đi chơi xa. Những bộ quần áo có thể giúp mèo cưng cảm thấy ấm áp hơn. Tất cả các phụ kiện đều được thiết kế theo xu hướng thời trang mới nhất. Đáp ứng đầy đủ các loại size, độ bền cao phù hợp với các giống mèo. Và điều quan trọng nhất là tạo sự thoải mái nhất cho mèo yêu mỗi khi sử dụng.",
    "mDepth": 1,
    "mParent": 32
  },
  {
    "mId": 42,
    "mName": "Quần áo & Trang sức cho mèo",
    "mDesc": "Hãy thể hiện phong cách thời trang của bạn với quần áo cho mèo tại Huimitu. Trước khi mặc quần áo, bạn cần nhớ rằng không phải chú mèo nào cũng thích mặc quần áo. Vậy nên chúng ta cần phải có thời gian để mèo làm quen với việc đó. Hãy kiên nhẫn, điều đó sẽ làm giảm căng thẳng cho mèo khi bạn muốn mặc quần áo cho chúng. Nếu muốn chú mèo của bạn thoải mái hơn, Huimitu có rất nhiều mẫu áo chùm và váy ngắn cho mèo đơn giản dễ mặc. Với chất liệu mềm mại, thoải mái và an toàn. Chúng tôi tin rằng chú mèo đáng yêu của bạn sẽ thích một trong những bộ quần áo cho mèo tại cửa hàng của Huimitu.",
    "mDepth": 2,
    "mParent": 41
  },
  {
    "mId": 43,
    "mName": "Vòng cổ & Dây dắt cho mèo",
    "mDesc": "Vòng cổ cho mèo là phụ kiện không thể thiếu nếu bạn muốn dắt người bạn của mình đi dạo. Hoặc cố định chúng tại một vị trí bạn mong muốn. Vòng cổ dây dắt mèo được thiết kế bằng nguyên liệu vải cotton cao cấp, độ bền cao. Chốt được thiết kế bằng nhựa dẻo có thể đóng mở dễ dàng. Mỗi chiếc vòng cổ đều có thể điều chỉnh độ rộng phụ thuộc kích thước của mèo cưng. Tại Huimitu có bán vòng cổ dây dắt mèo với đầy đủ các màu sắc. Chúng được thêu dệt và trang trí những họa tiết cực kì ngộ nghĩnh. Với chiếc vòng cổ này, bạn có thể gắn thêm chuông lục lạc hoặc bảng tên cho mèo cưng của mình. Nhờ đó mà bạn sẽ cảm thấy yên tâm và an toàn hơn.",
    "mDepth": 2,
    "mParent": 41
  },
  {
    "mId": 44,
    "mName": "Đồ chơi & Huấn luyện cho mèo",
    "mDesc": "Đồ chơi cho mèo vừa giúp bạn huấn luyện mèo con, vừa giúp mèo cưng có những phản xạ linh hoạt. Có rất nhiều cách làm đồ chơi cho mèo. Tuy nhiên, với bộ móng của chúng thì hạn sử dụng của chúng có vẻ như quá ngắn. Đó là lý do vì sao bạn nên lựa đồ chơi cho mèo cưng tại Huimitu. Với bản tính tò mò và có chút tinh nghịch, đồ chơi của mèo cưng được thiết kế phù hợp với tính cách của chúng. Có thể là những quả bóng có gắn chuông lăn tròn. Âm thanh luôn kích thích sự vận động của mèo. Việc vận động giúp chúng tiêu hao năng lượng. Làm giảm nguy cơ béo phì khi chúng quá yêu thích việc ngủ. Hay có thể một số đồ chơi được thiết kế bởi dây thừng. Chúng có thể mài móng ngay tại những món đồ chơi này. Đồ chơi thông minh còn giúp chúng cảm thấy luôn luôn vui vẻ và hạnh phúc.",
    "mDepth": 2,
    "mParent": 41
  },
  {
    "mId": 45,
    "mName": "Túi xách cho mèo",
    "mDesc": "Túi xách mèo giúp bạn có thể di chuyển mèo cưng tới nơi mà bạn mong muốn. Có thể là đưa mèo cưng về quê, đi du lịch, đi làm đẹp… Những chú mèo có đặc điểm khác biệt với những chú cún. Bạn không thể di chuyển chúng bằng xe hay ôm chúng trên tay. Đơn giản vì chúng có bản tính hơi nhát. Những chú mèo luôn sợ âm thanh lớn và ngại tiếp xúc với người lạ. Một chiếc địu, balo hoặc một chiếc túi xách chó mèo giá rẻ tại Huimitu là giải pháp duy nhất cho vấn đề này. Tại đây có rất nhiều các mẫu mã và kiểu dáng cho bạn lựa chọn. Với thiết kế gọn nhẹ, có quai xách tiện lợi, họa tiết trang trí cực kỳ dễ thương. Mèo cưng của bạn sẽ có những trải nghiệm thật đẹp với chiếc túi xinh xắn và đáng yêu này.",
    "mDepth": 2,
    "mParent": 41
  },
  {
    "mId": 46,
    "mName": "Balo đựng mèo",
    "mDesc": "Những sản phẩm Balo cho mèo chắc chắn và được thiết kế chu đáo với tính năng vận chuyển tốt nhất. Hãy tận hưởng chuyến đi của bạn, đồng thời đảm bảo rằng thú cưng của bạn cảm thấy thoải mái. Hãy mua ngay những chiếc Balo đựng mèo giá rẻ và nhiều vật dụng khác tại Huimitu, đồng thời đảm bảo dự trữ các đồ dùng cần thiết khác cho mèo như cát vệ sinh, vòng cổ cho mèo hoặc dụng cụ cào mèo hoặc cây dành cho mèo tiện dụng.",
    "mDepth": 2,
    "mParent": 41
  },
  {
    "mId": 47,
    "mName": "Lồng vận chuyển mèo",
    "mDesc": "Đi du lịch với người bạn mèo hay chỉ đơn giản là vận chuyển chúng ngoài đường không còn là thử thách khó khăn khi bạn có 1 chiếc Lồng vận chuyển mèo. Tại Huimitu chúng tôi cung cấp đầy đủ các sản phẩm hữu ích cho mèo của bạn và nhiều hơn thế nữa. Sản phẩm này sẽ giúp cho mèo cưng của bạn an toàn hơn mỗi khi ra bên ngoài và tận hưởng chuyến đi của chúng một cách thoải mái nhất.",
    "mDepth": 2,
    "mParent": 41
  },
  {
    "mId": 48,
    "mName": "Nhà, chuồng, nệm",
    "mDesc": "Nhà giúp thú cưng của bạn cảm thấy an toàn. Hãy giúp thú cưng của bạn tận hưởng một không gian riêng để chúng luôn cảm thấy hạnh phúc và an toàn. Huimitu cung cấp nhiều sản phẩm nhà thú cưng đặt trong nhà hoặc ngoài trời phù hợp với đa dạng nhu cầu. Khi mua nhà cho thú cưng, bạn hãy chú ý đến kích thước, thiết kế, vật liệu phù hợp với không gian của gia đình. Với các sản phẩm nguyên thùng hoặc đã lắp sẵn, Huimitu chắc chắn rằng bạn sẽ tìm được sản phẩm nhà cho thú cưng ưng ý tại các cửa hàng của chúng tôi.",
    "mDepth": 0,
    "mParent": null
  },
  {
    "mId": 49,
    "mName": "Nhà cho chó",
    "mDesc": "Nhà cho chó giúp thú cưng của bạn khiến chúng cảm thấy an toàn. Cho dù đó là Nhà cho chó bằng nhựa, Nhà cho chó bằng sắt hay Nhà cho chó bằng gỗ… cũng đều là lựa chọn tốt nhất bạn dành cho cún cưng của mình. Hãy giúp chú chó của bạn tận hưởng một không gian riêng để chúng luôn cảm thấy hạnh phúc và an toàn. Huimitu cung cấp nhiều sản phẩm nhà cho chó đặt trong nhà hoặc ngoài trời phù hợp với nhu cầu của mọi giống chó. Khi mua nhà cho chó, bạn hãy chú ý đến kích thước, thiết kế, vật liệu phù hợp với không gian của gia đình. Với các sản phẩm nguyên thùng hoặc đã lắp sẵn, Huimitu chắc chắn rằng bạn sẽ tìm được sản phẩm nhà cho chó ưng ý tại các cửa hàng của chúng tôi.",
    "mDepth": 1,
    "mParent": 48
  },
  {
    "mId": 50,
    "mName": "Lồng vận chuyển chó",
    "mDesc": "Nhà nhựa cho chó là sự lựa chọn hàng đầu nếu không gian sống của bạn không đủ rộng. Ưu điểm nổi bật của nhà bằng nhựa cho chó là thiết kế siêu đẹp, màu sắc đa dạng. Có cửa sổ và cửa ra vào cực kỳ thông thoáng. Đặc biệt, bạn có thể dễ dàng di chuyển ngôi nhà tới bất kì vị trí nào bạn mong muốn. Nhà cho chó còn rất tiện lợi trong việc vệ sinh và lau chùi. Tại Huimitu có bán nhà cho chó bằng nhựa với đầy đủ các kiểu dáng và kích cỡ. Một ngôi nhà nhỏ nhắn xinh xắn và đáng yêu chắc chắn sẽ làm cho cún cưng của bạn thích thú. Và có lẽ chúng sẽ vui mừng tới nỗi không còn nghĩ tới việc làm phiền bạn thêm nữa. Nhà nhựa cho chó đúng là một sản phẩm mang lại nhiều lợi ích cho cả bạn và cún cưng đúng không nào?",
    "mDepth": 2,
    "mParent": 49
  },
  {
    "mId": 51,
    "mName": "Nhà nhựa cho chó",
    "mDesc": "Nhà nhựa cho chó là sự lựa chọn hàng đầu nếu không gian sống của bạn không đủ rộng. Ưu điểm nổi bật của nhà bằng nhựa cho chó là thiết kế siêu đẹp, màu sắc đa dạng. Có cửa sổ và cửa ra vào cực kỳ thông thoáng. Đặc biệt, bạn có thể dễ dàng di chuyển ngôi nhà tới bất kì vị trí nào bạn mong muốn. Nhà cho chó còn rất tiện lợi trong việc vệ sinh và lau chùi. Tại Huimitu có bán nhà cho chó bằng nhựa với đầy đủ các kiểu dáng và kích cỡ. Một ngôi nhà nhỏ nhắn xinh xắn và đáng yêu chắc chắn sẽ làm cho cún cưng của bạn thích thú. Và có lẽ chúng sẽ vui mừng tới nỗi không còn nghĩ tới việc làm phiền bạn thêm nữa. Nhà nhựa cho chó đúng là một sản phẩm mang lại nhiều lợi ích cho cả bạn và cún cưng đúng không nào?",
    "mDepth": 2,
    "mParent": 49
  },
  {
    "mId": 52,
    "mName": "Chuồng sắt & Chuồng gỗ cho chó",
    "mDesc": "Hiện nay, Chuồng cho chó là một trong những đồ dùng được sử dụng rất phổ biến. Đây là sản phẩm giúp cố định vị trí cho cún yêu. Đặc biệt là với những chú chó nhỏ. Việc chạy nhảy có thể khiến chúng đi xa ngôi nhà của bạn. Với thiết kế lắp ráp linh hoạt, bạn có thể dễ dàng kiểm soát được cún cưng trong tầm mắt của mình. Bạn có thể gấp gọn chúng khi không cần dùng đến hoặc di chuyển đi chơi xa. Chuồng cho chó tạo ra một không gian an toàn cho người bạn bốn chân tại nhà. Bạn sẽ không phải lo lắng khi đi làm, hoặc khi không có ai ở nhà thú cưng sẽ cắn phá đồ đạc trong gia đình nữa. Chuồng cho chó sẽ phát huy tác dụng của mình và ngăn ngừa những thói quen cắn phá của cún cưng.",
    "mDepth": 2,
    "mParent": 49
  },
  {
    "mId": 53,
    "mName": "Quây chặn & Hàng rào chắn cho chó",
    "mDesc": "Tại Huimitu cung cấp nhiều mẫu mã Quây chó, Hàng rào chắn chó phù hợp với chú chó của bạn. Tương tự như Chuồng cho chó, những sản phẩm này được thiết kế để bảo vệ an toàn cho chú chó của bạn trong nhà và ngoài sân. Chọn mua rào quây chó hoặc hàng rào ngăn chó là giải pháp tốt nhất cho bạn và thú cưng.",
    "mDepth": 2,
    "mParent": 49
  },
  {
    "mId": 54,
    "mName": "Ổ nệm & Thảm đệm cho chó",
    "mDesc": "Nệm cho chó cùng các loại ổ thảm đệm cho cún cưng là đồ dùng hết sức cần thiết với đời sống tinh thần của vật nuôi. Giống như con người, giấc ngủ rất quan trọng. Một giấc ngủ ngon chỉ đến khi chúng ta có cảm giác an toàn, đối với những chú cún con cũng vậy. Một chiếc nệm cho chó mèo êm ái sẽ mang lại cảm giác bình yên cho thú cưng. Chúng sẽ cảm thấy được nâng niu, quan tâm và chăm sóc. Hãy giúp cho chó cưng của bạn cảm thấy ấm áp với những loại nệm cho chó giá rẻ. Và các vật dụng cần thiết có bán tại Huimitu. Bạn có thể tìm các mẫu mã sản phẩm thảm, ổ, đệm, nệm được thiết kế cực kỳ đẹp mắt tại đây. Ví dụ như nệm nằm, ghế sofa dài, thảm, giường, gối, cầu thang… Phù hợp với tất cả các giống chó bé lớn nhỏ. Và rất nhiều vật dụng khác dành tặng cho người bạn bốn chân của mình. Đặc biệt là với sự đa dạng về kích cỡ và kiểu dáng sẽ giúp cho cún yêu có một tư thế nằm ngủ thoải mái nhất.",
    "mDepth": 2,
    "mParent": 49
  },
  {
    "mId": 55,
    "mName": "Nhà cho mèo",
    "mDesc": "Nhà cho mèo là nơi giúp bạn cố định vị trí của mèo cưng. Có đôi khi chúng đi chơi xa nhà quá lâu khiến bạn lo lắng. Hoặc chúng quá nghịch ngợm khiến đồ đạc trong nhà trở lên lộn xộn. Với những chiếc nhà chắc chắn có thể giúp bạn cảm thấy yên tâm hơn.",
    "mDepth": 1,
    "mParent": 48
  },
  {
    "mId": 56,
    "mName": "Nhà mèo & Nhà cây Cattree cho mèo",
    "mDesc": "Nhà cây cho mèo hay còn được gọi là Cat tree. Đây được coi là khu vui chơi mà mèo cưng rất yêu thích. Với kết cấu đan xen từ những sợi dây thừng chắc chắn và an toàn với móng mèo. Nhà cây được cấu thành bởi các cột trụ thẳng đứng, nơi mèo cưng có thể cào móng và vươn vai thư giãn. Kết hợp với các khối hình hộp tạo thành ngôi nhà mini trên cao. Tại đây, mèo cưng có thể nghỉ ngơi và ngủ ngon lành. Các ngôi nhà đều có cửa ra vào rất tinh tế. Mèo cưng có thể biễu diễn khả năng leo trèo khéo léo của mình tại đây thay vì leo trèo trên tủ, kệ sách hay bình hoa.",
    "mDepth": 2,
    "mParent": 55
  },
  {
    "mId": 57,
    "mName": "Trụ cột & Bàn cào móng cho mèo",
    "mDesc": "Tại Huimitu có đầy đủ các các loại trụ cào móng cho mèo, bàn cào móng cho mèo giá rẻ, đảm bảo chất lượng, độ bền cao. Sự kết hợp thông minh với những món đồ chơi thể xoay tròn giúp mèo cưng thích thú say mê chơi đùa cả ngày. Chúng cũng sẽ chẳng còn thời gian để đi phá phách ngôi nhà của bạn nữa.",
    "mDepth": 2,
    "mParent": 55
  },
  {
    "mId": 58,
    "mName": "Chuồng mèo 1, 2, 3 tầng",
    "mDesc": "Chuồng cho mèo là nơi giúp bạn cố định vị trí của mèo cưng. Có đôi khi chúng đi chơi xa nhà quá lâu khiến bạn lo lắng. Hoặc chúng quá nghịch ngợm khiến đồ đạc trong nhà trở lên lộn xộn. Với những chiếc chuồng mèo bằng sắt tĩnh điện hoặc bằng nhựa có thể giúp bạn cảm thấy yên tâm hơn. Bạn đừng quá lo lắng sợ chúng sẽ phá phách trong chuồng nhé. Với thiết kế giữa các ô vuông đan xen giúp không gian tươi sáng hơn. Mèo cưng vẫn có thể nhìn thấy bạn, vì thế chúng sẽ rất ngoan ngoãn ở trong chuồng. Đặc biệt tại Huimitu có những chiếc chuồng tầng cho mèo cao cấp giúp mèo cưng vẫn có thể chơi đùa vui vẻ. Bất cứ chú mèo nào cũng thích leo trèo và cảm thấy tự hào về điều đó. Khu vệ sinh được thiết kế khéo léo trong góc chuồng để bạn có thể lau dọn dễ dàng hơn.",
    "mDepth": 2,
    "mParent": 55
  },
  {
    "mId": 59,
    "mName": "Ổ nệm & Thảm đệm cho mèo",
    "mDesc": "Đệm cho mèo, ổ, thảm hay nhà đệm là nơi mà bất kỳ một chú mèo nào cũng yêu thích. Hình ảnh những chú mèo nằm cuộn tròn trên ghế sofa chắc hẳn đã quá quen thuộc với bạn. Vậy thay vì nằm trên ghế, tại sao bạn không sắm ngay cho mèo cưng một chiếc đệm thật là êm ái khác. Điều này có thể giúp bạn tránh được những vết xước mà móng mèo gây ra. Đồng thời không bị phiền toái mỗi khi mèo cưng tới thời kỳ rụng lông. Các bạn có thể tham khảo các mẫu đệm cho chó mèo đẹp và mới nhất tại Huimitu. Có đầy đủ tất cả các kích cỡ cho bạn lựa chọn. Dựa vào dáng ngủ và cách bố trí trong phòng, bạn có thể lựa chọn cho mình một sản phẩm phù hợp nhất nhé.",
    "mDepth": 2,
    "mParent": 55
  },
  {
    "mId": 60,
    "mName": "Thuốc thú y",
    "mDesc": "Thuốc thú y mà Huimitu mang tới cho khách hàng rất đặc biệt. Đây đều là những sản phẩm tiện dụng. Bạn có thể sử dụng ngay tại nhà mà không cần phải tới các bệnh viện thú y. Để thú cưng có thể phát triển bình thường không bị tấn công bởi các ký sinh trùng thì việc sử dụng một số loại thuốc phòng bệnh là hết sức cần thiết. Uống thuốc tẩy giun định kỳ và vệ sinh môi trường sống sạch sẽ là một trong những cách phòng bệnh có hiệu quả nhất tính tới thời điểm này. Với mong muốn mang tới cho các bạn pet những sản phẩm chất lượng nhất. Tất cả các loại thuốc thú y được cung cấp bởi Huimitu cam kết đều là hàng chính hãng, đạt tiêu chuẩn chất lượng của hàng trăm quốc gia trên thế giới.",
    "mDepth": 0,
    "mParent": null
  },
  {
    "mId": 61,
    "mName": "Thuốc cho chó",
    "mDesc": "Thuốc thú y chó mà Huimitu mang tới cho khách hàng rất đặc biệt. Bao gồm: Thuốc tẩy giun cho chó, Thuốc trị ve chó, rận và bọ chét. Đây đều là những sản phẩm tiện dụng. Bạn có thể sử dụng ngay tại nhà mà không cần phải tới các bệnh viện thú y. Để cún cưng có thể phát triển bình thường không bị tấn công bởi các ký sinh trùng thì việc sử dụng một số loại thuốc phòng bệnh là hết sức cần thiết. Uống thuốc tẩy giun định kỳ và vệ sinh môi trường sống sạch sẽ là một trong những cách phòng bệnh có hiệu quả nhất tính tới thời điểm này. Với mong muốn mang tới cho các bạn cún những sản phẩm chất lượng nhất. Tất cả các loại thuốc thú y dành cho chó được cung cấp bởi Huimitu cam kết đều là hàng chính hãng. Đạt tiêu chuẩn chất lượng của hàng trăm quốc gia trên thế giới.",
    "mDepth": 1,
    "mParent": 60
  },
  {
    "mId": 62,
    "mName": "Tẩy xổ giun sán cho chó",
    "mDesc": "Bạn đã mua Thuốc tẩy giun cho chó con chưa? Và liệu có chắc loại thuốc bạn đang sử dụng thật sự mang lại hiệu quả. Hiện tại, trên thị trường có rất nhiều loại thuốc tẩy giun cho cún cưng. Tuy nhiên, những chú cún sau khi sử dụng thường không mang lại kết quả tốt. Nếu cún cưng nhà bạn có biểu hiện bụng căng tròn, khó tiêu thì đó không hẳn do chúng ăn no. Rất có thể đó lại là chiếc “bụng giun”. Ngay lập tức cần phải tiêu diệt lũ giun ấy ngay. Các sản phẩm chính hãng như thuốc tẩy giun cho chó Sanpet, Bayer for Puppies, Lopatol… được bày bán tại các cửa hàng của Huimitu. Các bác sĩ thú y đã kiểm nghiệm và tin dùng. Đây là những loại thuốc tẩy giun cho chó an toàn và mang lại hiệu quả cao nhất hiện nay.",
    "mDepth": 2,
    "mParent": 61
  },
  {
    "mId": 63,
    "mName": "Trị ve rận & bọ chét cho chó",
    "mDesc": "Bạn có thể tìm thấy các loại Thuốc trị ve chó, trị rận, diệt bọ chét ở chó tại Huimitu. Việc điều trị kịp thời sẽ ngăn chặn việc sinh sản của ve rận trên người cún cưng. Nếu không điều trị nhanh chóng, chúng có thể xâm nhập vào gia đình bạn, thậm chí chúng có thể gây hại cho con người. Sử dụng các cách diệt bọ chét tại nhà như: thuốc xịt chuồng, Sữa tắm cho chó trị ve rận. Với cún cưng, bạn cũng có thể lựa chọn các loại thuốc phù hợp với cân nặng của chó cưng. Kết hợp với việc vệ sinh môi trường sống thì chắc chắn cún cưng của bạn sẽ được an toàn. Sau khi dã diệt sạch ve rận, bạn nên đeo vòng trị ve rận để ký sinh trùng không thể quay lại tấn công cún cưng nữa. Hãy giữ cho chó của bạn luôn khỏe mạnh với những sản phẩm tốt nhất tại Huimitu.",
    "mDepth": 2,
    "mParent": 61
  },
  {
    "mId": 64,
    "mName": "Thuốc cho mèo",
    "mDesc": "Thuốc thú y cho mèo giúp cho mèo cưng phòng tránh sự xâm nhập của các loại kí sinh trùng nguy hiểm. Một số bệnh về đường ruột liên quan tới giun sán có thể gây tử vong ở mèo. Hoặc các loại ký sinh trùng như ve, rận nếu không kịp thời phát hiện và điều trị sẽ gây ra những tổn thương về da. Nặng hơn có thể gây thương tổn về thần kinh. Bạn có thể dễ dàng tìm kiếm các sản phẩm thuốc thú y chuyên dụng cho mèo tại Huimitu. Các loại thuốc tẩy giun, thuốc trị viêm tai hay thuốc trị ve rận đều được kiểm định chất lượng. Đảm bảo độ an toàn cho sức khỏe của mèo cưng. Các thử nghiệm đều mang lại kết quả tốt và được các bác sỹ thú y khuyên dùng.",
    "mDepth": 1,
    "mParent": 60
  },
  {
    "mId": 65,
    "mName": "Tẩy xổ giun & sán cho mèo",
    "mDesc": "Thuốc tẩy giun cho mèo với tác dụng ngăn ngừa cho mèo khỏi sự xâm nhập và tấn công của các loại giun. Một số loại sán và ký sinh trùng như giun đũa, giun móc cũng có thể bị tiêu diệt. Thuốc tẩy giun sán cho chó mèo có thể tìm thấy ngay tại Huimitu. Các loại thuốc có thể ở dạng lỏng hoặc dạng viên. Bạn có thể cho mèo cưng uống trực tiếp hoặc trộn với thức ăn để mèo cưng có thể hấp thụ tốt nhất. Việc tẩy giun định kỳ cho mèo cưng là việc làm không thể bỏ qua. Dù chú mèo dù ở bất cứ độ tuổi nào cũng cần được chăm sóc. Đây là cách tốt nhất để bảo vệ hệ tiêu hóa vốn dĩ yếu ớt của mèo cưng. Giúp chúng tăng khả năng để miễn dịch lại với các yếu tố xấu từ môi trường xung quanh.",
    "mDepth": 2,
    "mParent": 64
  },
  {
    "mId": 66,
    "mName": "Trị ve rận & bọ chét cho mèo",
    "mDesc": "Có rất nhiều cách diệt bọ chét ve rận mèo mang lại hiệu quả cao. Với bộ lông dày và bản tính hay đi chơi của mèo cưng, việc bị lây nhiễm ve rận là điều không thể tránh khỏi. Nếu mèo cưng của bạn đang ở chế độ an toàn bạn nên mua vòng chống rận để phòng tránh. Vòng được tạo bởi hương thơm tự nhiên đặc biệt. Lũ ký sinh trùng sẽ không dám bén mảng tới gần mèo yêu của bạn. Nếu chú mèo bị ve rận xâm nhập bạn nên mua Thuốc trị ve rận cho mèo tại Huimitu. Điều trị kịp thời sẽ khiến chúng không thể sinh sản và tiếp tục gây hại. Các sản phẩm ở đây đều được đảm bảo về chất lượng, độ an toàn cho sức khỏe của mèo cưng. Tất cả đều đã được kiểm nghiệm với kết quả cực kỳ tốt.",
    "mDepth": 2,
    "mParent": 64
  }
]

const tree: DataNode[] = [];

const prevParent: DataNode[] = [];

data.forEach(item => {
  const { mId, mName, mDepth, mParent } = item;
  const node: DataNode = {
    key: mId,
    title: mName,
    icon: <CarryOutOutlined />,
    children: []
  };

  if (mDepth === 0) {
    prevParent.push(node);
    tree.push(node);
    return;
  }

  while (mParent !== prevParent.at(-1)?.key) {
    prevParent.pop();
  }

  const parent = prevParent.at(-1);
  if (parent) {
    parent.children!.push(node);
  }
  prevParent.push(node);
});

export const ListCategory: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const [selectedParent, setSelectedParent] = useState<number | null>(null);
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    setSelectedCategory(tree[0].key as number);
    console.log(1)
  }, []);

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
  };


  return (
    <>
      <Breadcrumb className="my-4">
        <Breadcrumb.Item>
          <NavLink to='/'>Home</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Category</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={16}>
        <Col sm={24} lg={8}>
          <Tree
            className="rounded p-3"
            showLine={{ showLeafIcon: false }}
            showIcon={true}
            onSelect={onSelect}
            treeData={tree}
          />
        </Col>
        <Col sm={24} lg={16}>
          <div className="rounded p-3 bg-white">
            <Button className="float-right mb-2">
              Add child
            </Button>
            <Form
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 19 }}
              name="category"
              className="clear-both"
            >
              <Form.Item
                label="Name"
                name="mName"
                required
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Description"
                name="mDesc"
                required
              >
                <ReactQuill theme="snow" value={description} onChange={setDescription} />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  )
}