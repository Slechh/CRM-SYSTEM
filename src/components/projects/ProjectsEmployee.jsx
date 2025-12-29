export function ProjectsEmployee({ expert }) {
  return (
    <div className="bg-bgApp rounded-3xl">
      <div className="p-4 h-[180px] w-[300px] flex flex-col justify-center gap-2">
        <div className="flex justify-center">
          <img src="/images/photo.png" alt="" className="w-20 h-20" />
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="font-semibold">Kazarov Dima</div>
          <div>{expert.role}</div>
        </div>
      </div>
    </div>
  );
}
