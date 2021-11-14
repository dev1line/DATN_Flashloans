import Head from "next/head";
const Define = (props) => {
  return (
    <div className="container">
      <Head>
        <link key="/css/define.css" rel="stylesheet" href="/css/define.css" />
      </Head>
      <div className="div-section">
        <img src="/img/aave.png" className="img-define" />
        <div className="content">
          <h2>Aave Protocol (AAVE) là gì?</h2>
          <p>
            Aave protocol (AAVE) là một nền tảng cho vay tiền điện tử phi tập
            trung. Trên thực tế, nó là giao thức cho vay DeFi đầu tiên khi nó ra
            mắt mainnet đầu tiên của mình với tên gọi ETHlend vào năm 2017 (đây
            là trước khi thuật ngữ Defi được đặt ra). Vào tháng 11 năm 2017,
            giao thức đã tiến hành ICO trị giá 18 triệu đô la để đổi lấy 975
            triệu token, tương đương 75% tổng nguồn cung. Dự án bắt đầu với tên
            gọi ETHLend, cho đến khi đổi thương hiệu thành Aave (LEND) vào cuối
            năm 2018. Aave đã tham gia DeFi và ra mắt cùng với Kyber, 0x
            Protocol, Bancor và các giao thức tài chính khác.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Define;
