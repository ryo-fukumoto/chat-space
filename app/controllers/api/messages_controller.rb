class Api::MessagesController < ApplicationController
  def index
    # ルーティングでの設定によりparamsの中にgroup_idというキーでグループのidが入るので、これを元にDBからグループを取得する
    # group = Group.find(params[:group_id])
    # ajaxで送られてくる最後のメッセージのid番号を変数に代入
    # last_message_id = params[:id]
    # 取得したグループでのメッセージ達から、idがlast_messge_idよりも新しい(大きい)メッセージ達のみを取得
    @messages = Message.includes(:user).where("id > ?", params[:id]).where(group_id: params[:group_id])
  end
end