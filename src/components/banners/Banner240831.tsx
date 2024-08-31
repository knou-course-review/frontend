import BannerWrapper from "./BannerWrapper";

export default function Banner240831() {
  return (
    <BannerWrapper
      targetUrl="https://docs.google.com/forms/d/144d0xNG5qS7E5LqVZA4shQzoXDSfrbBasvGOXPHOA8Q/viewform?edit_requested=true&fbzx=7935022246590281477"
      cookieKey="kb240830"
      theme="dark"
    >
      <div
        className="flex flex-col h-full pl-24 sm:pl-56 justify-end text-sm sm:text-base bg-[#ea672f] text-white dark:text-slate-200 bg-[left_-2.25rem_center] sm:bg-[left_-1.25rem_center] bg-no-repeat bg-[length:130px_130px] sm:bg-[length:250px_250px]"
        style={{ backgroundImage: "url(banner-240830.svg)" }}
      >
        <p className="mb-2 sm:mb-6">
          <span className="sm:text-xl">노우강에 대한 의견을 들려주세요!</span>
          <br />
          <span className="text-xs sm:text-sm">설문조사 바로가기 ▶</span>
        </p>
      </div>
    </BannerWrapper>
  );
}
